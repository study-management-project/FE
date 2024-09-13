import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import HighlightedCodeLine from './HighligtCodeLine';
import { List } from 'immutable';

const CodeEditor = ({code, setCode, prevCode}:{code:string, setCode:Dispatch<SetStateAction<string>>, prevCode:string|undefined}) => {
  // textarea 내용

  // textarea 높이
  const [codeLines,setCodelines] = useState<List<string>>(List());

  useEffect(() => {
    console.log(code);
    let list:List<string> = List();
    code.split(/\n/).forEach((value:string) => {
      console.log(value);
      list = list.push(value);
    });
    setCodelines(list);
  },[code])

  useEffect(() => {
    console.log(codeLines);
  },[codeLines])

  return (
    <div>
     {codeLines.map((codeLine:string, key:number) => {
      return <HighlightedCodeLine codeLine={codeLine} key={key} line={key} setCodelines={setCodelines}/>
     })} 
    </div>
  );
}

export default CodeEditor;