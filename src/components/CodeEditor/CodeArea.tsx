import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import './CodeArea.css'
import HighlightedCode from './HighlightCode';

const CodeArea = ({code, setCode, height, setHeight}:{code:string, setCode:Dispatch<SetStateAction<string>>, height:number, setHeight:Dispatch<SetStateAction<number>>}):JSX.Element => {
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const lineHeight:number = 24;

  const highlightedCodeRef = useRef<HTMLDivElement | null>(null);
  // 높이 조정
  const adjustHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = `${24}px`;
      const newHeight:number = Math.max(Math.floor(textarea.current.scrollHeight / lineHeight), 1);

      setHeight(newHeight);
      textarea.current.style.height = `${newHeight * 1.5}rem`;
    }
  }

  const focusTextarea = () => {
    if (textarea.current) {
      textarea.current.focus();
    }
  }

  // 스크롤 동기화 함수
  const syncHighlightedCodeScroll = () => {
    if (highlightedCodeRef.current && textarea.current) {
      highlightedCodeRef.current.scrollLeft = textarea.current.scrollLeft;
      highlightedCodeRef.current.scrollTop = textarea.current.scrollTop;
    }
  }

  // 이벤트 등록

  useEffect(() => {
    if (textarea.current) {
      textarea.current.addEventListener('scroll', syncHighlightedCodeScroll);
    }

    return () => {
      if (textarea.current) {
        textarea.current.removeEventListener('scroll', syncHighlightedCodeScroll);
      }
    };
  }, [textarea.current]);


  return (
    <>
      <textarea 
      className='resize-none border-none focus:border-none outline-none absolute p-0 bg-transparent text-transparent ml-8 font-light'
      style={{height:`${height*1.5}rem`}}
      wrap='off'
      onInput={adjustHeight}
      onChange={e => setCode(e.target.value)}
      ref={textarea}
      >

      </textarea>
      <div 
      className='highlighted-code' 
      ref={highlightedCodeRef}
      onClick={focusTextarea}
      >
        <HighlightedCode code={code}/>
      </div>
    </>
  )
}

export default CodeArea;