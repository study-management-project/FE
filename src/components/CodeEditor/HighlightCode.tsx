import hljs, { AutoHighlightResult } from 'highlight.js';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import './HighlightCode.css';



const HighlightedCode = ({ code}: { code: string }) => {
    const [displayValue, setValue] = useState<string>("");
    const [language, setLang] = useState<string|undefined>(undefined);

    useEffect(() => {
        const { value: highlightedCode, language }:AutoHighlightResult = hljs.highlightAuto(code);
        setValue(highlightedCode);
        setLang(language);
    },[code])

  return (
    <pre>
      <code 
      className={language} 
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayValue, {ALLOWED_TAGS: ["span"]}) }} />
    </pre>
  );
};

export default HighlightedCode;