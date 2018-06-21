import * as React from 'react';

interface IMessageProps {
    winner?: string;
    message?: string;
    turn?: boolean;
}

// const Message = (props: IMessageProps) => {
//     if(props.winner){
//         return `${props.winner} heeft gewonnen`;
//     }
//     if(props.message){
//         return props.message;
//     }
//     return `${props.turn? "X" : "O"} is aan de buurt`;
    
// };

// export default Message;


export default class Message extends React.Component<IMessageProps, {}>{
    render() {
        if(this.props.winner){
            return `${this.props.winner} heeft gewonnen`;
        }
        if(this.props.message){
            return this.props.message;
        }
        return `${this.props.turn? "X" : "O"} is aan de buurt`;
    }
}