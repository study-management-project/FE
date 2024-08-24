import { useEffect, useState } from 'react'
import LineDisplay from './LineDisplay'
import CodeArea from './CodeArea';

const CodeEditor = () => {
  // textarea 내용
  const [code, setCode] = useState<string>(""); 

  // textarea 높이
  const [textareaHeight, setHeight] = useState<number>(1);

  return (
    <div className='flex relative'>
      <LineDisplay textareaHeight={textareaHeight} />
      <CodeArea setCode={setCode} height={textareaHeight} setHeight={setHeight}/>
    </div>
  )
}

export default CodeEditor