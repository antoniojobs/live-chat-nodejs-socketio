var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http); //adiciona o socketio

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

//manipulador de rota apontando para index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     console.log('um ususario se conectou');
// });
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});