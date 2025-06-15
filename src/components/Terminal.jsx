// Terminal.jsx
import React, { useState } from 'react';
import CommandHandler from './CommandHandler';
import '../styles/terminal.css';

export default function Terminal() {
 const [output, setOutput] = useState(['FiveNine Terminal v1.0']);
 const [input, setInput] = useState('');
 
 const addOutput = (content) => {
   setOutput(prev => [...prev, content]);
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!input.trim()) return;
   
   addOutput(`> ${input}`);
   CommandHandler.execute(input, addOutput);
   setInput('');
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
       <span>$ </span>
       <input 
         value={input}
         onChange={e => setInput(e.target.value)}
         autoFocus
       />
     </form>
   </div>
 );
}