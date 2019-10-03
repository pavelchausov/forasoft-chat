import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const sentStartRequest = (info) => {
    socket.emit('sentStartRequest', info);
}

const getName = (cb) => {
    socket.on('setUser', ({ userName }) => cb(null, userName));
}
const sentMessage = (msg) => {
    socket.emit('sentMessage', msg);
}

const getNewMessage = (cb) => {
    socket.on('newMessage', msg => cb(null, msg));
} 

const clearSockets = (eventType) => {
    socket.off(eventType);
}

export {
    sentName,
    getName,
    sentMessage,
    getNewMessage,
    clearSockets,
};