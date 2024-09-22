import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import HighlightedCodeLine from './HighligtCodeLine';
import { List } from 'immutable';
import Caret from './Caret';
import _ from 'lodash';
import SelectionOverlay from './Overlay';
import { rem } from '../../style/fontsize';

const CodeEditor = ({code, setCode, prevCode, textArea}:{code:string, setCode:Dispatch<SetStateAction<string>>, prevCode:string|undefined, textArea:React.RefObject<HTMLInputElement>}) => {
  // 노드 저장
  const startNode = useRef<Node>();
  const endNode = useRef<Node>();
  const startOffset = useRef<number>(0);
  const endOffset = useRef<number>(0);
  // selection 시작 위치
  const [selectionStart, setSelectionStart] = useState<List<number>>(List([0,0]));
  // selection 끝 위치
  const [selectionEnd, setSelectionEnd] = useState<List<number>>(List([0,1]));
  // 커서 Y 위치
  const [cursorPos, setCursorPos] = useState<List<number>>(List([0,0]));
  // 선택 끝 위치
  const [cursorEnd, setCursorEnd] = useState<List<number>>(List([0,0]));
  // 줄 업데이트
  const [codeLines,setCodelines] = useState<List<string>>(List());
  // 마운트
  const isMounted = useRef<boolean>(false);

  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key=== "Backspace") {
      e.preventDefault();
      
      let updatedCodeLines:List<string> = List(codeLines);

      // selectionStart와 selectionEnd 값 가져오기
      const [startLine, startChar] = [selectionStart.get(0), selectionStart.get(1)];
      const [endLine, endChar] = [selectionEnd.get(0), selectionEnd.get(1)];
  
      // 선택된 범위가 같은 줄에 있는 경우 처리
      if (startLine === endLine && startLine !== undefined) {
          const updatedLine:string = (updatedCodeLines.get(startLine)?.substring(0, startChar) as string) + (updatedCodeLines.get(startLine)?.substring(endChar as number) as string);
          updatedCodeLines = updatedCodeLines.set(startLine, updatedLine);
      } 
      setCodelines(updatedCodeLines);
      // selectionStart, selectionEnd 값 업데이트
      setSelectionStart(List([startLine, startChar]) as List<number>);
      setSelectionEnd(List([startLine, startChar]) as List<number>);
    }
  }

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
      if (focusOffset) {
        startOffset.current = focusOffset;
      }
      if (clickedNode && childNodes && focusOffset !== undefined) {
        index = getIndex(childNodes, clickedNode, focusOffset);
        startNode.current = clickedNode;
        const range:Range = document.createRange();
        range.setStart(clickedNode, focusOffset);
        range.setEnd(clickedNode, focusOffset);
        const rect:DOMRect = range.getBoundingClientRect(); 
        setCursorPos(List([line * rem(1.5), rect.left]));
        // setSelectionEnd(List([line,index]));
      }
      setSelectionStart(List([line, index]));
    },0)
  };
  
  const onMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const {currentTarget} = e;
    const parentElement = currentTarget.parentElement;
    const childNodes:NodeListOf<ChildNode> | undefined = parentElement?.firstChild?.childNodes;
    let index:number = 0;
    let line:number = parseInt(currentTarget.parentElement?.parentElement?.getAttribute("id") as string);
    const selection:Selection|null = document.getSelection();
    const clickedNode:Node | null | undefined = selection?.focusNode;
    if (clickedNode) {
      endNode.current = clickedNode;
    }
    const focusOffset:number|undefined = selection?.focusOffset;
    endOffset.current = focusOffset as number;
    console.log(endOffset);
    console.log(selection);
    
    if (clickedNode && childNodes && focusOffset !== undefined) {
      index = getIndex(childNodes, clickedNode, focusOffset);
      const range:Range = document.createRange();
      range.setStart(clickedNode, focusOffset);
      range.setEnd(clickedNode, focusOffset);
      const rect:DOMRect = range.getBoundingClientRect(); 
      
      if (Number.isNaN(line)) {
        line = Math.floor((rect.top-rem(3))/rem(1.5));
      }
      if (clickedNode.textContent === "\n") {
        index = 0;
      }
      setCursorEnd(List([line * rem(1.5), rect.left]));
    }
    console.log(`line, index = ${line}, ${index}`)
    setSelectionEnd(List([line, index]));
  }

  useEffect(() => {
    let list:List<string> = List();
    code.split(/\n/).forEach((value:string) => {
      list = list.push(value);
    });
    setCodelines(list);
  },[code])

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      return;
    }
    textArea.current?.focus();
    const range:Range = document.createRange();
    range.setStart(startNode.current as Node, startOffset.current as number);
    range.setEnd(endNode.current as Node, endOffset.current as number);
  },[selectionEnd])

  return (
    <div 
    className='relative'
    onClick={(e:React.MouseEvent) => {e.stopPropagation()}}
    onMouseUp={onMouseUp}
    >
      {codeLines.map((codeLine:string, key:number) => {
        return <HighlightedCodeLine codeLine={codeLine} line={key} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
        })}
      { 
        selectionStart.get(1) === selectionEnd.get(1) && selectionStart.get(0) === selectionEnd.get(0) ? <Caret position={cursorPos} /> : <></>
      }
      <SelectionOverlay codeLines={codeLines} selectionStart={selectionStart} selectionEnd={selectionEnd} cursorPos={cursorPos} cursorEnd={cursorEnd} />
      <input 
      className='bg-transparent outline-none text-transparent caret-transparent' 
      ref={textArea}
      onKeyDown={onKeyDown}
      ></input>
    </div>
    
  );
}

export default CodeEditor;