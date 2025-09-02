import React, { useState } from 'react';
import Login from './components/Login';
import SectionTabs from './components/SectionTabs';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('files');

  if (!user) return <Login onLogin={setUser} setMode={setMode} />;
  if (mode==="chat") return <ChatRoom user={user} />;
  return <SectionTabs user={user} />;
}

export default App;
