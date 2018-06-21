import * as React from 'react';
import Board from './containers/Board';
import styled from 'styled-components';

const StyledApp = styled.div`
    text-align: center;
    background: #14BDAC;
    width: 100vw;
    height:100vh;
`

const App = () => <StyledApp> <Board /> </StyledApp>;

export default App;