import { Dispatch, SetStateAction, useEffect, useRef} from 'react'
import './CodeArea.css'
import HighlightedCode from './HighlightCode';

const CodeArea = ({code, setCode, height, setHeight, prevCode, saveSnapshot}:{code:string, setCode:Dispatch<SetStateAction<string>>, height:number, setHeight:Dispatch<SetStateAction<number>>, prevCode:string|undefined, saveSnapshot: () => void}):JSX.Element => {
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const lineHeight:number = 24;
  const highlightedCodeRef = useRef<HTMLDivElement | null>(null);
  // 높이 조정
  const adjustHeight = ():void => {
    if (textarea.current) {
      textarea.current.style.height = `${24}px`;
      const newHeight:number = Math.max(Math.floor(textarea.current.scrollHeight / lineHeight), 1);

      setHeight(newHeight);
      textarea.current.style.height = `${newHeight * 1.5}rem`;
    }
  }

  // 스크롤 동기화 함수
  const syncHighlightedCodeScroll = ():void => {
    if (highlightedCodeRef.current && textarea.current) {
      highlightedCodeRef.current.scrollLeft = textarea.current.scrollLeft;
      highlightedCodeRef.current.scrollTop = textarea.current.scrollTop;
    }
  }

  const onKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target:HTMLTextAreaElement = e.currentTarget;
    if (e.ctrlKey && (e.key ==="s" || e.key === "S") ) {
      e.preventDefault();
      saveSnapshot();
      return;
    }

    setTimeout(() => {
      setCode(target.value);
    },0)
  }

  useEffect(() => {
    if (textarea.current) {
      textarea.current.value = code;
      adjustHeight();
    }
  },[code])

  // 스크롤 동기화 이벤트 등록
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

  useEffect(() => {
    if (prevCode) {
      textarea.current?.setAttribute("disabled", "true");
    } else {
      textarea.current?.removeAttribute("disabled");
    }
  },[prevCode])


  return (
    <>
      <textarea 
      className='resize-none border-none focus:border-none outline-none absolute p-0 bg-transparent text-transparent ml-12 font-light'
      style={{height:`${height*1.51}rem`, caretColor: 'white'}}
      wrap='off'
      onInput={adjustHeight}
      onChange={e => setCode(e.target.value)}
      onKeyDown={onKeyDown}
      ref={textarea}
      spellCheck='false'
      id='text-area'
      >

      </textarea>
      <div 
      className='highlighted-code' 
      ref={highlightedCodeRef}
      >
        <HighlightedCode code={code}/>
      </div>
    </>
  )
}

export default CodeArea;