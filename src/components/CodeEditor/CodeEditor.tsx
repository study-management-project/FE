import { Dispatch, SetStateAction, useState } from 'react'
import LineDisplay from './LineDisplay'
import CodeArea from './CodeArea';

const CodeEditor = ({code, setCode, prevCode}:{code:string, setCode:Dispatch<SetStateAction<string>>, prevCode:string|undefined}) => {
  // textarea 내용

  // textarea 높이
  const [textareaHeight, setHeight] = useState<number>(1);

  return (
    <div className='flex relative'>
      <LineDisplay textareaHeight={textareaHeight} />
      <CodeArea code={code} setCode={setCode} height={textareaHeight} setHeight={setHeight} prevCode={prevCode}/>
    </div>
  )
}

export default CodeEditor;