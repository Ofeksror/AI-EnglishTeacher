'use client';
import React from 'react'
import test from '@/utils/test';

const Translator: React.FC = () => {
  return (
    <div className='translator-container'>
        <button onClick={test}>Click Here</button>
    </div>
  )
}

export default Translator;