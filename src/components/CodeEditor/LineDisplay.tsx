import { useEffect, useState } from "react";
import './LineDisplay.css';

const LineDisplay = ({textareaHeight}:{textareaHeight:number}):JSX.Element => {
  const [lines, setLines] = useState<number[]>([1]);

  // textarea 높이에 따른
  const createLines = (length:number):Array<number> => {
    return Array.from({length:length}, (v,i) => i+1);
  }

  useEffect(() => {
    setLines(createLines(textareaHeight));
  },[textareaHeight])

  return (
    <div 
    className='line-container w-8 overflow-y-scroll'
    style={{
      height:`${textareaHeight*1.5}rem`
    }}
    >
      {lines.map(line => <div className='text-center text-white'>{line}</div>)}
    </div>
  )
}

export default LineDisplay;