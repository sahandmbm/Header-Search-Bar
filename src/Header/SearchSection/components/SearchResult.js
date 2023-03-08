import React, { useState } from 'react';
import styled from 'styled-components'
import logo from '../../../assets/logo.svg';

function Search( props ) {

    //=-=-=-=-=-=-=-=-=-=-=-= STYLES =-=-=-=-=-=-=-=-=-=-=-=
    const Div = styled.div
    `
        position: relative;
        flex-direction: row;
        display: flex;
        border-bottom: 1px solid rgba(255,255,255,.5);
        margin: 0px 10px;
        transition:.5s;
        &:hover {
            color: #B94A3E;
            cursor: pointer;
            transition:.5s;
        }
    `

    const Img = styled.img
    `
        width: 100px;
        aspect-ratio:1;
        margin:10px 10px 5px 0px;
        border-radius: 16px;
    `

    const InfoDiv = styled.div
    `
        position: relative;
        flex-direction: column;
        display: flex;
        text-align: left;
        margin-top: 10px;

    `

    const TitleText = styled.p
    `
        margin:0px;
        font-size: .8em;
        font-weight: bold;
    `

    const AuthorText = styled.p
    `
        margin:0px;
        font-size: .6em;
    `

    const YearText = styled.p
    `
        margin:0px;
        font-size: .4em;
    `

    return (
        <Div onClick={() => { window.open(`https://www.amazon.co.uk/s?k=${props.title}`)}} >
            <div>
                <Img src={props.image} alt={props.title}/>
            </div>

            <InfoDiv>
                <TitleText>{props.title}</TitleText>

                <AuthorText>{props.author}</AuthorText>

                <YearText>{props.year}</YearText>
            </InfoDiv>
        </Div>

    );
}

export default Search;