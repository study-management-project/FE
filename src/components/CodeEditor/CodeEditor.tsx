import { useState } from 'react'
import LineDisplay from './LineDisplay'
import CodeArea from './CodeArea';

const CodeEditor = () => {
  const [lines, setLines] = useState<number[]>([1]);
  const [textareaHeight, setHeight] = useState<number>(1);

  // useEffect(() => {
  //   lines
  // },[textareaHeight])
  return (
    <div className='flex relative'>
      <LineDisplay lines={lines} />
      <div className='flex-grow relative'>
        <CodeArea height={textareaHeight} setHeight={setHeight} />
      </div>
    </div>
  )
}

export default CodeEditor