import * as React from 'react';
import {DragSource} from 'react-dnd';
import styled from 'styled-components';

const StyledSign = styled.div`
    width: 100px;
    height: 100px;
    cursor: pointer;
    font-size: 90px;
    color: ${(props: {value: string}) => props.value === 'X'? '#545454': '#F2EBD3'}
`

interface ISignProps{
    value: string;
    canDrag: boolean;
    connectDragSource?: any;
}

const spec = {
    beginDrag(props: ISignProps) {
        return { value: props.value};
    },
    canDrag(props: ISignProps){
        return props.canDrag;
    }
}
function collect(connect: any) {
    return {
        connectDragSource: connect.dragSource(),
    }
}

class Sign extends React.Component<ISignProps, {}> {
    render() {
        const {connectDragSource} = this.props;
        return connectDragSource(
            <div style={{width: '100px', height: '100px'}}>
                <StyledSign value={this.props.value} > {this.props.value} </StyledSign>
            </div>
        );
    }
}

export default DragSource('card', spec, collect)(Sign) ;