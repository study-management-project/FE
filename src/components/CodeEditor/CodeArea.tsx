import React, { Dispatch, SetStateAction } from 'react'

const CodeArea = ({height, setHeight}:{height:number, setHeight:Dispatch<SetStateAction<number>>}) => {


  const onKeyDown = (event:React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("Enter")
      setHeight(height+1);
    }
  }

  return (
    <textarea 
    className='w-full resize-none border-none focus:border-none outline-none absolute p-0 max-h-dvh'
    style={{height:`${height*1.5}rem`}}
    onKeyDown={onKeyDown}
    >

    </textarea>
  )
}

export default CodeArea