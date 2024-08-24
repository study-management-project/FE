import { Dispatch, SetStateAction, useRef } from 'react'
import './CodeArea.css'

const CodeArea = ({setCode, height, setHeight}:{setCode:Dispatch<SetStateAction<string>>, height:number, setHeight:Dispatch<SetStateAction<number>>}):JSX.Element => {
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const lineHeight:number = 24;

  // 내용 업데이트
  const updateCode = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  }

  // 높이 조정
  const adjustHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = `${24}px`;
      const newHeight:number = Math.max(Math.floor(textarea.current.scrollHeight / lineHeight), 1);

      setHeight(newHeight);
      textarea.current.style.height = `${newHeight * 1.5}rem`;
    }
  }

  return (
    <textarea 
    className='resize-none border-none focus:border-none outline-none absolute p-0 bg-transparent text-white ml-8'
    style={{height:`${height*1.5}rem`}}
    wrap='off'
    onChange={updateCode}
    onInput={adjustHeight}
    ref={textarea}
    >

    </textarea>
  )
}

export default CodeArea