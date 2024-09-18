import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import HighlightedCodeLine from './HighligtCodeLine';
import { List } from 'immutable';
import Caret from './Caret';
import _ from 'lodash';

const CodeEditor = ({code, setCode, prevCode, textArea}:{code:string, setCode:Dispatch<SetStateAction<string>>, prevCode:string|undefined, textArea:React.RefObject<HTMLInputElement>}) => {
  // selection 시작 위치
  const [selectionStart, setSelectionStart] = useState<List<number>>(List([0,0]));
  // selection 끝 위치
  const [selectionEnd, setSelectionEnd] = useState<List<number>>(List([0,1]));
  // 커서 Y 위치
  const [cursorPos, setCursorPos] = useState<List<number>>(List([0,0]));
  // 줄 업데이트
  const [codeLines,setCodelines] = useState<List<string>>(List());

  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key=== "Backspace") {
      e.preventDefault();
      
      let updatedCodeLines = codeLines;

      // selectionStart와 selectionEnd 값 가져오기
      const [startLine, startChar] = [selectionStart.get(0), selectionStart.get(1)];
      const [endLine, endChar] = [selectionEnd.get(0), selectionEnd.get(1)];
  
      // 선택된 범위가 같은 줄에 있는 경우 처리
      if (startLine === endLine && startLine !== undefined) {
        const updatedLine = updatedCodeLines.get(startLine as number)?.slice(0, startChar) + updatedCodeLines.get(startLine).slice(endChar);
        updatedCodeLines = updatedCodeLines.set(startLine, updatedLine);
      } 
      setCodelines(updatedCodeLines);
      console.log(startLine, startChar);
      // selectionStart, selectionEnd 값 업데이트
      setSelectionStart(List([startLine, startChar]));
      setSelectionEnd(List([startLine, startChar]));
    }
  }

  useEffect(() => {
    let list:List<string> = List();
    code.split(/\n/).forEach((value:string) => {
      list = list.push(value);
    });
    setCodelines(list);
  },[code])

  useEffect(() => {
    const selection:Selection|null = document.getSelection();
    const anchorNode = selection?.anchorNode;
    const anchorOffset = selection?.anchorOffset;
    const focusNode = selection?.focusNode;
    const focusOffset = selection?.focusOffset;
    setTimeout(() => {
      if (selection) {
        if (anchorNode && focusNode && anchorOffset && focusOffset) {
          selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
        }
      }
      console.log('selection 설정');
    },50)
  }, [selectionEnd]);

  // useEffect(() => {
  //   console.log(codeLines);
  // },[codeLines])

  // useEffect(() => {
  //   console.log(`selectionStart의 줄 = ${selectionStart.get(0)}, offSet = ${selectionStart.get(1)}`);
  // },[selectionStart])

  return (
    <div className='relative'>
      {codeLines.map((codeLine:string, key:number) => {
        return <HighlightedCodeLine codeLine={codeLine} line={key} setCodelines={setCodelines} setSelectionStart={setSelectionStart} setSelectionEnd={setSelectionEnd} setCursorPos={setCursorPos}/>
        })}
      {
        selectionStart.get(1) === selectionEnd.get(1) && selectionStart.get(0) === selectionEnd.get(0) ? <Caret position={cursorPos} /> : <></>
      }
      <input 
      className='bg-transparent outline-none text-transparent caret-transparent' 
      ref={textArea}
      onKeyDown={onKeyDown}
      ></input>
    </div>
    
  );
}

export default CodeEditor;