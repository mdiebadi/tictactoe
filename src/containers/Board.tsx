import * as React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Sign from '../components/Sign';
import ITile from '../components/Tile';
import Message from '../components/Message';
import ResetButton from '../components/ResetButton';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center;
`

const StyledContainerHeader = styled.div`
    background-color: #F8F8F8;
    flex-basis: 100%; 
    display: flex;
    justify-content: center;
    color: #757575;
    height: 100px;
    align-items: flex-end;
    padding: 20px;
    font-size: 25px;
`

const StyledSign = styled.div`
    flex-basis: 150px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    align-content: flex-start;  
`

const StyledTiles = styled.div`
    display: flex; 
    width: 310px;
    flex-wrap: wrap;
    margin-top: 20px;
`

interface IBoardState {
    tiles: string[],
    turn: boolean;
    winner: string;
    message: string;
}

interface ITile {
    value: string
}

class Board extends React.Component<{}, IBoardState> {
    constructor(props: {}) {
        super(props);
        const turn = Math.floor(Math.random() * 2);
        this.state = {
            tiles: ['','','','','','','','',''],
            turn: !!turn,
            winner: undefined,
            message: undefined,
        }
    }
    render() {
        return (
            <StyledContainer> 
                <StyledContainerHeader>
                    <Message winner={this.state.winner} message={this.state.message} turn={this.state.turn}/>
                </StyledContainerHeader>
                <StyledSign>
                    {!this.state.winner && !this.state.message && <Sign value='O' canDrag={!this.state.turn} />}
                </StyledSign>
                <StyledTiles>
                    {this.state.tiles.map((tileValue: string, i: number)=> <ITile key={i} index={i} value={tileValue} onDrop={(tile: ITile, index: number)=>this.handleDrop(tile, index)} /> )}
                </StyledTiles>
                <StyledSign>
                    {!this.state.winner && !this.state.message && <Sign value='X' canDrag={this.state.turn} />}
                </StyledSign>
                <ResetButton reset={()=>this.handleReset()} value={this.state.message? "Nieuwe Ronde" : "Opnieuw beginnen"} />
            </StyledContainer>
        )
    }
    private handleDrop(tile: ITile, index: number) {

        const tiles: string[] = [...this.state.tiles];
        tiles[index] = tile.value;
        let newState: IBoardState = {
            tiles: tiles,
            turn: !this.state.turn,
            winner: undefined,
            message: undefined,
        }
        if(this.checkForWinner(newState.tiles)){
            newState.winner = tile.value;
        }else if(!newState.tiles.includes('')){
            newState.message = "Geen winnaars, begin opnieuw!"
        }
        this.setState(newState);

    }
    private checkForWinner(tiles: string[]) {
        const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
        for(let i = 0; i < winningCombinations.length; i++){
            if (
                tiles[winningCombinations[i][0]] && 
                tiles[winningCombinations[i][1]] && 
                tiles[winningCombinations[i][2]] && 
                tiles[winningCombinations[i][0]] === tiles[winningCombinations[i][1]] && 
                tiles[winningCombinations[i][0]] === tiles[winningCombinations[i][2]]
            ){
                return true;
            }
        }
    }
    private handleReset() {
        const turn = Math.floor(Math.random() * 2);
        this.setState({
            tiles: ['','','','','','','','',''],
            turn: !turn,
            winner: undefined,
            message: undefined,
        });
    }
}

export default DragDropContext(HTML5Backend)(Board);