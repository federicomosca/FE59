// Terminal.jsx
import React, { useState } from 'react';
import CommandHandler from './CommandHandler';
import '../styles/terminal.css';

export default function Terminal() {
  const [output, setOutput] = useState([
    'fivenine terminal v1.0',
    'Use the shell to navigate. Type "help" for manual.',
    'Available: "user", "movie", etc.'
  ]);
  const [input, setInput] = useState('');
  const [currentEntity, setCurrentEntity] = useState(null);
 
  const addOutput = (content) => {
    setOutput(prev => [...prev, content]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    addOutput(`> ${input}`);
    CommandHandler.execute(input, addOutput, currentEntity, setCurrentEntity);
    setInput('');
  };

  const getPrompt = () => {
    return currentEntity ? `${currentEntity}$ ` : '$ ';
  };

  return (
    <div className="terminal">
      <div className="output">
        {output.map((item, i) => (
          <div key={i} className="line">
            {typeof item === 'string' ? item : item}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-line">
        <span>{getPrompt()}</span>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}