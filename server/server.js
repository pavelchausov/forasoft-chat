const io = require('socket.io')();
const chat = require('./chat.js');
const lodash = require('lodash');

io.on('connection', (client) => {
    console.log('a user connected');
    client.on('disconnect', () => {
        console.log('user disconnected');
    });

    // {name: "Vasya", id: 1234}
    client.on('sentName', (msg) => {
        // parse name
        const { name: userName, route } = msg;
        console.log('new user: ', userName);
        client.emit('setName', { userName });
        // create room
        // chat.createRoom(io, 'odin');
        // sent back room url
        client.on('sentMessage', ({ message, timeStamp}) => {
            io.emit('newMessage', { message, timeStamp, author: userName });
            console.log({'message in server': message, timeStamp, author: userName });
        });
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port: ', port);