import React from 'react';
import './index.css';
import { sentMessage, getNewMessage, clearSockets } from '../api';

export default class ChatRoom extends React.Component {
    constructor(props) {
        console.log("chat props: ",props)
        super(props);
    }

    state = {
        messages: [
            {
                author: 'default',
                message: 'default msgs',
                timeStamp: 123
            }
        ],
        inputText: '',
    }

    componentDidMount() {
        getNewMessage((err, newMsg) => {
            this.updateMessages(newMsg);
        });
    }

    componentWillUnmount() {
        clearSockets('newMessage');
    }

    updateMessages = (msg) => {
        const { messages } = this.state;
        this.setState({
            messages: [
                ...messages,
                msg,
            ],
        });
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({ inputText: value });
    }

    handeSubmit = (e) => {
        e.preventDefault();
        const {
            inputText,
        } = this.state;
        sentMessage({
            message: inputText,
            timeStamp: Date.now()
        });
        this.setState({
            inputText: '',
        });
    }


    render() {
        const {
            messages,
            inputText,
        } = this.state;
        return (
            <>
                <ul className="messages">
                    {messages.map(this.renderChatMessage)}
                </ul>
                <form onSubmit={this.handeSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        autoComplete="off"
                        value={inputText}
                        onChange={this.handleInputChange}
                    />
                    <button formAction="submit">Send</button>
                </form>
            </>
        )
    }

    renderChatMessage({ message, timeStamp, author }) {
        const makeTime = (timeStamp) => {
            const date = new Date(timeStamp);
            // date.setTime(timeStamp);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return(`${hours}:${minutes}:${seconds}`);
        }

        return (
            <li key={timeStamp} className="messages__block">
                <div className="messages__text">{author}: {message}</div>
                <div className="messages__time">{makeTime(timeStamp)}</div>
            </li>
        );
    }
}