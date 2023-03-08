
import logo from '../../assets/logo.svg';
import styled from 'styled-components'

function Logo() {
    const Div = styled.div
    `
    width: 100px;
    height: 100px;
    display: 'flex'
    justify-content: "center"
    align-items: "center"
    `

    const Img = styled.img
    `
    width: 100px;
    aspect-ratio:1;
    `

    return (
        <Div>
            <Img src={logo} className="App-logo" alt="logo"/>
        </Div>
    );
}

export default Logo;