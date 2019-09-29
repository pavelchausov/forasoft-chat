import React from 'react';
import { sentName } from '../api';

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userName: '',
    }
    
    handleInputChange = ({ target: { value }}) => {
        this.setState({ userName: value });
    }

    handeSubmit = (e) => {
        e.preventDefault();
        const {
            userName,
        } = this.state;
        sentName(userName);
        this.setState({
            userName: '',
        });
    }

    render() {
        const {
            userName
        } = this.state;
        return (
            <div>
            <form onSubmit={this.handeSubmit}>
                <input
                    className="input-name"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={this.handleInputChange}
                />
                <button formAction="submit">Send</button>
            </form>
            </div>
        );
    }
}