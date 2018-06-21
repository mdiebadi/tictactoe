import * as React from 'react';
import {DropTarget} from 'react-dnd';
import styled from 'styled-components';

const StyledTile = styled.div`
    font-size: 90px;
    text-align: center;
    width: 100px;
    height: 100px;
    color: ${(props:ITileProps)=>props.value === 'X'? '#545454': '#F2EBD3' };
    border-right: ${(props:ITileProps)=>getBorderRightValues(props)};
    border-bottom: ${(props:ITileProps)=>getBorderBottomValues(props)};
    background: ${(props:ITileProps)=>getBackgroundColor(props)}
`
function getBorderRightValues(props: ITileProps): string{
    if(props.index === 0 || props.index === 1 || props.index === 3 || props.index === 4 || props.index === 6|| props.index === 7){
        return '5px solid rgba(0, 0, 0, .2)';
    }
}
function getBorderBottomValues(props: ITileProps): string{
    if(props.index === 0 || props.index === 1 || props.index === 2 || props.index === 3 || props.index === 4|| props.index === 5){
        return '5px solid rgba(0, 0, 0, .2)';
    }
}
function getBackgroundColor(props: ITileProps): string{
    if(props.isOver && !props.canDrop){
        return '#B64926';
    }
    if(props.isOver){
        return '#468966';
    }
}

interface ITileProps{
    value: string;
    index: number;
    onDrop?(tile: ITile, index: number): void;
    connectDropTarget?: any;
    canDrop?: boolean;
    isOver?: boolean;
}

interface ITile {
    value: string
}

const spec = {
    drop(props: ITileProps, monitor: any, component: any) {
        props.onDrop(monitor.getItem(), props.index);
    },
    canDrop(props: ITileProps, monitor: any) {
        return !props.value;
    }
}
function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

class Tile extends React.Component<ITileProps, {}> {
    render() {
        const {connectDropTarget, canDrop, isOver} = this.props;
         
        return connectDropTarget(
            <div>
                <StyledTile value={this.props.value} index={this.props.index} canDrop={this.props.canDrop} isOver={this.props.isOver}> 
                    {this.props.value}
                </StyledTile >
            </div>
        )
    }
}

export default DropTarget('card', spec, collect)(Tile);