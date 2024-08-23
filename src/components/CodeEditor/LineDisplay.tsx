import React from 'react'

const LineDisplay = ({lines}:{lines:number[]}) => {
  return (
    <div className='w-8'>
      {lines.map(line => <div className='text-center text-white'>{line}</div>)}
    </div>
  )
}

export default LineDisplay;