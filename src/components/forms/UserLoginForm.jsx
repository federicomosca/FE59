// forms/UserLoginForm.jsx
import React, { useState } from 'react';

export default function UserLoginForm({ onSubmit }) {
  const [data, setData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="terminal-form">
      <input 
        placeholder="username" 
        value={data.username}
        onChange={e => setData({...data, username: e.target.value})}
      />
      <input 
        type="password" 
        placeholder="password"
        value={data.password}
        onChange={e => setData({...data, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
}