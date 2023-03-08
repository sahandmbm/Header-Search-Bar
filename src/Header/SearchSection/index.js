import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'

import SearchResult from './components/SearchResult'

// redux
import { useDispatch } from 'react-redux';
import { SET_SEARCH } from '../../Store/actions';

function Search() {

    //=-=-=-=-=-=-=-=-=-=-=-= STYLES =-=-=-=-=-=-=-=-=-=-=-=
    const Div = styled.div
    `
        width: fit-content;
        height: fit-content;
        position: relative;
        margin-right:10px;
    `

    const Input = styled.input
    `
        height: 20px;
        width: 20vw;

        border: 1px solid #204254;

        padding: 10px;
        font-size: 18px;
        letter-spacing: 2px;
        outline: none;
        border-radius: 16px;
        transition: all .5s ease-in-out;
        background-color: rgba(255,255,255,.5);
        padding-right: 40px;
        color:#204254;

        ::placeholder {
            color: #204254;
            opacity: 1;
        }
    `

    const SearchDiv = styled.div
    `
        width: 30vw;
        height: 40vh;
        position: absolute;
        margin-top: 10px;
        right: 0px;
        background-color: rgba(255,255,255,.5);
        border: 1px solid #204254;
        border-radius: 16px;
        backdrop-filter: blur(10px);
        overflow: scroll;
        padding:0px;
        overflow-anchor: none;
    `

    const UL = styled.ul
    `
        list-style-type: none;
        padding:0px;
        overflow-anchor: none;
    `

    const Button = styled.button
    `
        width: 80%;
        margin:0px 0px 20px 0px;
        padding:1em;
        border: 1px solid  #B94A3E;
        border-radius:16px;
        background-color: rgba(255,255,255,.5);
        transition:.5s;
        &:hover {
            background-color: #B94A3E;
            color: rgba(255,255,255,.5);
            cursor: pointer;
            transition:.5s;
        }
    `

    const Loader = styled.div
    `
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #B94A3E; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    position: relative;
    top:42%;
    left:42%;
    `

    //=-=-=-=-=-=-=-=-=-=-=-= STATES =-=-=-=-=-=-=-=-=-=-=-=
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [howManyResults, setHowManyResults] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setHowManyResults(10)
        setSearchResult(null)

        const fetchData = setTimeout(() => {
            fetch("https://openlibrary.org/search.json?title="+searchText)
                .then((response) => response.json())
                .then((data) => setSearchResult(data))
                .then(setLoading(false))
                .catch((err) => {
                    console.log(err.message);
                });
        }, 5000)

        return () => clearTimeout(fetchData)

    }, [searchText]);

    //HANDLE CLICK OUTSIDE OF THE SEARCH BOX
    //HOOK FOR CLOSING THE SEARCH BOX
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchText('')
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                //clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    //REDUX TO STORE INFO (NOT SURE WHERE TO USE THE WRITTEN STATE!)
    const dispatch = useDispatch();
    // Save the values to REDUX store
    useEffect(() => {
        dispatch({ type: SET_SEARCH, searchResult });
    }, [dispatch, searchResult]);
    
    return (
        <Div>
            <Input 
                autoFocus="autoFocus"
                type="text" 
                value={searchText} 
                onChange={e=>setSearchText(e.target.value)} 
                placeholder="Quick Search..."
            />

            {searchText !== '' && 
                <SearchDiv ref={wrapperRef}>
                    {loading === false && searchResult !== null  ?
                    <>
                    <UL>
                        {searchResult["docs"].slice(0, howManyResults).map(item => {
                            return (
                                <li>
                                    <SearchResult 
                                        title={item.title} 
                                        author={item.author_name}
                                        year={item.first_publish_year}
                                        image={`https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`}
                                    />
                                </li>
                            )
                        })}
                    </UL>
                    <Button onClick={()=>setHowManyResults(howManyResults+10)}>
                        Load More...
                    </Button>
                    </>
                    :
                    <Loader></Loader>
                    }
                </SearchDiv>

            }
        </Div>

    );
}

export default Search;