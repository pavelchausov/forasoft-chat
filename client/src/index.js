import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './ChatRoom';
import StartScreen from './StartScreen';
import { getName, clearSockets } from './api';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <Route exact path="/" component={ChatRoom} />
            <Route exact path="/room/:roomId" component={ChatRoom} />
        </Router>
    )
} 

class App1 extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userName: '',
    }
    componentDidMount() {
        getName((err, userName) => {
            this.setState({ userName });
        });
    }
    componentWillUnmount() {
        clearSockets('setName');
    }

    render() {
        const {
            userName
        } = this.state;
        if (userName === '') {
            return <StartScreen />
        }
        return <ChatRoom userName={userName} />;
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
