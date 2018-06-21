import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 100vw;
    height: 50px;
    background: #F8F8F8;
    font-size: 20px;
    cursor: pointer;
    border: none;
    margin-top: 20px;
    color: #14BDAC;
`

interface IResetButton {
    reset(): void;
    value: string;
}

const ResetButton = (props: IResetButton) => <StyledButton onClick={props.reset}> {props.value} </StyledButton>;

export default ResetButton;