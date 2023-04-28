'use client';
import React from 'react'
import test from '@/old/test';

const Translator: React.FC = () => {
  return (
    <>
      <h1>Translator</h1>
      <div className='translator-container'>
        <div className='original'>
          <input type="text"></input>
        </div>
        <div className='destination'>
          <input type="text"></input>
        </div>
      </div>
    </>
  )
}

export default Translator;