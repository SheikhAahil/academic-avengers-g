const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/files');
const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);
app.use('/api/chat', chatRoutes);

const users = {};
let messages = [];

io.on('connection', (socket) => {
  let currentUser = null;

  socket.on('join', ({username, password}, cb) => {
    if(password !== process.env.CHAT_PASSWORD) return cb("Invalid chat password");
    if(users[username]) return cb("Username taken");
    users[username] = socket.id;
    currentUser = username;
    socket.emit('joined', messages);
    cb();
  });

  socket.on('message', (msg) => {
    if(!currentUser) return;
    const messageObj = {id: Date.now(), user: currentUser, text: msg.text, link: msg.link || null};
    messages.push(messageObj);
    io.emit('message', messageObj);
  });

  socket.on('edit', ({id, text}) => {
    const msg = messages.find(m => m.id === id && m.user === currentUser);
    if(msg) { msg.text = text; io.emit('update', msg); }
  });

  socket.on('delete', (id) => {
    const index = messages.findIndex(m => m.id === id && m.user === currentUser);
    if(index !== -1) { messages.splice(index,1); io.emit('delete', id); }
  });

  socket.on('disconnect', () => {
    if(currentUser) delete users[currentUser];
  });
});

server.listen(process.env.PORT || 5000, () => console.log('Backend running'));
