// import { useEffect, useState } from 'react';
// import { Map } from "immutable";
// import HighlightedCodeLine from './HighligtCodeLine';


// const HighlightedCode = ({ code }: { code : string }) => {
//   const [codeLines,setCodelines] = useState<Map<string, string>>(Map());

//   useEffect(() => {
//     const newMap:Map<string,string> = Map();
//     console.log(code.split("\n"));
//     code.split("\n").forEach((value:string, index:number) => {
//       console.log(index, value);
//       newMap.set(`${index}`,value);
//     });
//     console.log(newMap.keys());
//     setCodelines(newMap);
//   },[code])

//   useEffect(() => {
//     console.log(codeLines);
//   },[codeLines])

//   return (
//     <>
//      {codeLines.map((codeLine:string, key:string) => {
//       return <HighlightedCodeLine codeLine={codeLine} key={key} />
//      })} 
//     </>
//   );
// };

// export default HighlightedCode;