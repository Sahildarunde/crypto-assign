import React from 'react';
import './index.css';

export default function Card({ value, onChange, crypto, amount, handler }) {
  return (
    <div className='card-container'>
      <div className='card'>
        <p>{crypto}</p>
        <p>{amount}</p>
      </div>
      <input className='input' placeholder='Qty' type="text" value={value} onChange={onChange} />
      <button className='button' onClick={handler}>Add</button>
    </div>
  );
}
