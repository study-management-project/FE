  import hljs, { AutoHighlightResult } from 'highlight.js';
  import DOMPurify from 'dompurify';
  import { Dispatch, SetStateAction, useEffect, useState } from 'react';
  import 'highlight.js/styles/atom-one-dark.css';
  import './HighlightCode.css';
  import { List } from 'immutable';
  import { rem } from '../../style/fontsize';


  const HighlightedCodeLine = ({ codeLine, line, onMouseDown, onMouseUp }: { codeLine: string, line:number, onMouseDown:(e:React.MouseEvent)=>void, onMouseUp:(e:React.MouseEvent)=>void }) => {
    const [displayValue, setValue] = useState<string>("");
    const [language, setLang] = useState<string|undefined>(undefined);

    useEffect(() => {
        const { value: highlightedCode, language }:AutoHighlightResult = hljs.highlightAuto(codeLine === "" ? "\n" : codeLine);
        setValue(highlightedCode);
        setLang(language);
    },[codeLine])

  return (
    <div className='flex text-white relative'
      key={line}
      id={`${line}`}
      style={
        {zIndex: 1}
      }
    >
      <div className='w-12 text-center select-none'>{line}</div>
      <pre className='w-[calc(100%-4rem)] pl-4'>
        <code 
        className={language}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayValue, {ALLOWED_TAGS: ["span"]}) }} />
      </pre>
    </div>
  );
  };

  export default HighlightedCodeLine;