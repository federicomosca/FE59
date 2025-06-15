// forms/UserForm.jsx
import React, { useState } from 'react';

export default function UserForm({ onSubmit }) {
  const [data, setData] = useState({ username: '', email: '', password: '' });

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
        placeholder="email" 
        value={data.email}
        onChange={e => setData({...data, email: e.target.value})}
      />
      <input 
        type="password" 
        placeholder="password"
        value={data.password}
        onChange={e => setData({...data, password: e.target.value})}
      />
      <button type="submit">Create User</button>
    </form>
  );
}