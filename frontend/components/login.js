import React, { useState } from 'react';

export default function Login({onLogin, setMode}) {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [isChat, setIsChat] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(isChat && pw!=="ACAVG") return setError("Wrong chatroom password");
    if(!isChat && pw!=="ACAAVGAA") return setError("Wrong upload password");
    if(isChat && !user) return setError("Username required");
    onLogin(isChat?{username:user,chat:true}:{username:user,upload:true});
    setMode(isChat?"chat":"files");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      {isChat && (<input placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} />)}
      <input placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button type="submit">{isChat?"Enter Chat":"Upload/Files"}</button>
      <button type="button" onClick={()=>setIsChat(!isChat)}>{isChat?"Files":"Chat"}</button>
      <div style={{color:'red'}}>{error}</div>
    </form>
  );
}
