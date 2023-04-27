import React from 'react'

interface Props {
  transcript: any; // type is object
}

const Corrections: React.FC<Props> = ({ transcript }) => {
  return (
    <div className='corrections-container'>
        <p>Transcribed Text: {transcript.text}</p>
    </div>
  )
}

export default Corrections;