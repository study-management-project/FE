import hljs, { AutoHighlightResult } from 'highlight.js';
import DOMPurify from 'dompurify';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import './HighlightCode.css';
import { List } from 'immutable';
import { rem } from '../../style/fontsize';


const HighlightedCodeLine = ({ codeLine, line, setCodelines, setSelectionStart, setSelectionEnd, setCursorPos }: { codeLine: string, line:number, setCodelinse:Dispatch<SetStateAction<List<string>>>, setSelectionStart:Dispatch<SetStateAction<List<number>>>, setSelectionEnd:Dispatch<SetStateAction<List<number>>>, setCursorPos:Dispatch<SetStateAction<List<number>>> }) => {
  const [displayValue, setValue] = useState<string>("");
  const [language, setLang] = useState<string|undefined>(undefined);

  useEffect(() => {
      const { value: highlightedCode, language }:AutoHighlightResult = hljs.highlightAuto(codeLine === "" ? "\n" : codeLine);
      setValue(highlightedCode);
      setLang(language);
  },[codeLine])

  // 클릭된 문자의, 한 줄에서의 index 가져오기
  const getIndex = (childNodes:NodeListOf<ChildNode>, clickedNode:Node, focusOffset:number):number => {
    let cnt=0;
    for (let childNode of childNodes) {
      // 텍스트
      if (childNode.nodeName === "#text") {
        if (childNode.isEqualNode(clickedNode) ) {
          if (focusOffset) {
            cnt += focusOffset;
          }
          break;
        } else {
          if (childNode.textContent?.length) {
            cnt += childNode.textContent?.length; 
          } else {
            cnt += 0;
          }
        }
      // 노드
      } else {
        if (childNode.firstChild) {
          if (childNode.firstChild.isSameNode(clickedNode)) {
            if (focusOffset) {
              cnt += focusOffset;
            }
            break;
          } else {
            if (childNode.textContent?.length) {
              cnt += childNode.textContent?.length; 
            } else {
              cnt += 0;
            }
          }
        }
      }
    }
    return cnt;
  }

  const onMouseUp = (e: React.MouseEvent) => {
    const {currentTarget} = e;
    const parentElement = currentTarget.parentElement;
    const childNodes:NodeListOf<ChildNode> | undefined = parentElement?.firstChild?.childNodes;
    let index:number = 0;
    const line:number = parseInt(currentTarget.parentElement?.parentElement?.getAttribute("id") as string);
    const selection:Selection|null = document.getSelection();
    const clickedNode:Node | null | undefined = selection?.focusNode;
    const focusOffset:number|undefined = selection?.focusOffset;
    if (clickedNode && childNodes && focusOffset !== undefined) {
      index = getIndex(childNodes, clickedNode, focusOffset);
    }
    setSelectionEnd(List([line, index]));
  }

  const onMouseDown = (e: React.MouseEvent) => {
    const {currentTarget} = e;
    const parentElement = currentTarget.parentElement;
    const childNodes:NodeListOf<ChildNode> | undefined = parentElement?.firstChild?.childNodes;
    let index:number = 0;
    const line:number = parseInt(currentTarget.parentElement?.parentElement?.getAttribute("id") as string);
    
    setTimeout(() => {
      
      const selection:Selection|null = document.getSelection();
      const clickedNode:Node | null | undefined = selection?.focusNode;
      const focusOffset:number|undefined = selection?.focusOffset;
      if (clickedNode && childNodes && focusOffset !== undefined) {
        index = getIndex(childNodes, clickedNode, focusOffset);

        const range:Range = document.createRange();
        range.setStart(clickedNode, focusOffset);
        range.setEnd(clickedNode, focusOffset);
        const rect:DOMRect = range.getBoundingClientRect();
        setCursorPos(List([line * rem(1.5), rect.left]));
      }
      setSelectionStart(List([line, index]));
    },0)
  };


return (
  <div className='flex text-white'
    key={line}
    id={`${line}`}
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