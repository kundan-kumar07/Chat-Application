const io = require('socket.io')(8000, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
      console.log('New user:', name);
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
      console.log(`${users[socket.id]} sent: ${message}`);
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });

  socket.on('disconnect', () => {
      if (users[socket.id]) {
          console.log(`${users[socket.id]} left the chat`);
          socket.broadcast.emit('user-left',{name: users[socket.id]});
          delete users[socket.id];
      }
  });
});


