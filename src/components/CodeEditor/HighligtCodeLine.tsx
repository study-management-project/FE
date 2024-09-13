import hljs, { AutoHighlightResult } from 'highlight.js';
import DOMPurify from 'dompurify';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import './HighlightCode.css';
import { List } from 'immutable';
import Cursor from './Cursor';


const HighlightedCodeLine = ({ codeLine, key, line, setCodelines }: { codeLine: string, key:number, line:number, setCodelinse:Dispatch<SetStateAction<List<string>>> }) => {
  const [displayValue, setValue] = useState<string>("");
  const [language, setLang] = useState<string|undefined>(undefined);
  const [cursorPosition, setCursorPosition] = useState<{ top: number, left: number } | null>(null); // 커서 위치 저장

  useEffect(() => {
      const { value: highlightedCode, language }:AutoHighlightResult = hljs.highlightAuto(codeLine === "" ? "\n" : codeLine);
      setValue(highlightedCode);
      setLang(language);
  },[codeLine])

  const onClick = (e:React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0); // 선택한 범위
      const rects = range.getBoundingClientRect(); // 선택한 범위의 위치를 가져옴

      const parentOffset = (e.target as HTMLElement).getBoundingClientRect(); // 부모 요소의 위치
      const cursorX = rects.left - parentOffset.left; // 부모 요소에 대한 상대적 위치
      const cursorY = rects.top - parentOffset.top;
      console.log(cursorX, cursorY);
      setCursorPosition({ top: cursorY, left: cursorX }); // 커서 위치 저장
    }
  }

return (
  <div className='flex text-white'>
    <div className='w-12 text-center'>{line}</div>
    <pre className='w-[calc(100%-4rem)] pl-4'>
      <code 
      className={language}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayValue, {ALLOWED_TAGS: ["span"]}) }} />
    </pre>
    {cursorPosition && <Cursor position={cursorPosition} />}
  </div>
);
};

export default HighlightedCodeLine;