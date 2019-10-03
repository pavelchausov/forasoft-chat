const io = require('socket.io')();
const chat = require('./chat.js');
const uniqueId = require('lodash.uniqueid');
// url = /room/roomID
// io.on('connection', function(socket){
//   socket.join('some room');
//   socket.emit('some event', msg) - отправка сообщения ТОЛЬКО в те комнаты, к которым присоединился сокет??
//   socket.on('some other event', cb) - получение сообщений ТОЛЬКО из этой комнаты и корневого сокета?
// });

// io.to('some room').emit('some event');
const roomStorage = {
    // roomid : {
    //     members: {
    //         userId: {
    //             userName, 
    //             connection: userConnection
    //         } 
    //     }
    // 
}
const joinRoom = (client, roomId, user) => {
    const { userId } = user;
    roomStorage[roomId]['members'] = {
        'userId': user,
    }
    client.join(roomId);
};

const createRoom = () => {
    const roomId = uniqueId('r');
    roomStorage[roomId] = {
        members: [],
    };
    return roomId;
};

const checkRoomId = (roomIdFromClient) => {
    const roomId = (roomStorage[roomIdFromClient]) ? roomIdFromClient : createRoom();
    return roomId;
};

const createUser = (userName) => {
    return {
        userName,
        userId: uniqueId(),
    };
};

const startMessaging = (client, roomId, user) => {
    joinRoom(client, roomId, user);
    client.emit('setUser', user);
    client.on('sentMessage', ({ message, timeStamp}) => {
        io.to(roomId).emit('newMessage', { message, timeStamp, author: userName });
        console.log({'message in server': message, timeStamp, author: userName });
    });
};

const handleClientSentName = (client, msg) => {
    // parse name
    const { userName, roomId: roomIdFromClient } = msg;
    const user = createUser(userName) // {userName: .., userId: ....}
    // create_or_join_room
    const roomId = checkRoomId(roomIdFromClient);
    // emit roomId and username
    startMessaging(client, roomId, user);
    client.join(roomId);
    console.log('new user: ', userName);
    client.emit('setName', { userName });
    
};

io.on('connection', (client) => {
    console.log('a user connected');
    client.on('disconnect', () => {
        console.log('user disconnected');
    });

    // {name: "Vasya", id: 1234}
    client.on('sentStartRequest', (info) => {
        handleClientSentName(client, info);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port: ', port);