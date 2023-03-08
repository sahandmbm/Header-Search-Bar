import Logo from './LogoSection'
import Search from './SearchSection'

import styled from 'styled-components'

function App() {
    const Div = styled.div
        `
        background-color: rgba(255,255,255,.5);
        padding: .2em;

        display: flex;
        justify-content: space-between;
        align-items: center;
        `

    return (
        <Div>
            <Logo/>
            <Search/>
        </Div>
    );
}

export default App;
