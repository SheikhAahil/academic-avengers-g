import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function ChatRoom({user}) {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    socket.emit('join', {username:user.username, password:'ACAVG'}, err => {
      if(err) alert(err);
    });
    socket.on('joined', ms => setMsgs(ms));
    socket.on('message', m => setMsgs(ms=>[...ms,m]));
    socket.on('update', up =>
      setMsgs(ms=>ms.map(m => m.id === up.id? up:m ))
    );
    socket.on('delete', id =>
      setMsgs(ms=>ms.filter(m=>m.id!==id))
    );
    return ()=>socket.disconnect();
  }, []);
  function sendMsg(e) {
    e.preventDefault();
    socket.emit('message',{text:msg});
    setMsg('');
  }
  return (
    <div>
      <ul>{msgs.map(m =>
        <li key={m.id}>
          <b>{m.user}</b>: {m.text}
        </li>
      )}</ul>
      <form onSubmit={sendMsg}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  )
}
