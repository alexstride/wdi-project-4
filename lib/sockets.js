const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  const io = socketIo(server); // this gives us a socketIO instance, allowing us to receive socket connections.

  const socket = io.of('/socket');
  socket.on('connection', socket => {
    console.log('connection received');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('hello', () => console.log('picked up a hello event!'));
  });

  connection = socket;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
