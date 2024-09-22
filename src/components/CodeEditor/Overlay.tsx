import { useEffect, useRef, useState } from "react";
import { rem } from "../../style/fontsize";
import { List } from "immutable";

const SelectionOverlay = ({ codeLines, selectionStart, selectionEnd, cursorPos, cursorEnd }: {codeLines:List<string>, selectionStart:List<number>, selectionEnd:List<number>, cursorPos:List<number>, cursorEnd:List<number>}) => {
    const [overlays, setOverlay] = useState<JSX.Element[]>([]);
    const isMounted = useRef<boolean>(false);

    const getTextLength = (text:string):number => {
        const canvas:HTMLCanvasElement = document.createElement('canvas');
        const context:CanvasRenderingContext2D|null = canvas.getContext("2d");
        if(context) {
            context.font = "16px monospace"
            return context.measureText(text).width;
        }
        return 0;
    }

    useEffect(() => {
        if (isMounted.current === false) {
            isMounted.current = true;
            return;
        }
        const newOverlay:JSX.Element[] = [];
        const startLine:number = selectionStart.get(0) as number;
        const endLine:number = selectionEnd.get(0) as number;
        const startChar:number = selectionStart.get(1) as number;
        const endChar:number = selectionEnd.get(1) as number;
        console.log(startLine, startChar, endLine, endChar);
        // 줄 단위로 오버레이 생성
        for (let line = startLine; line <= endLine; line++) {
            const copyLines:List<string> = List(codeLines);
            const curline:string = copyLines.get(line) as string;

            if (line === startLine && line === endLine) {
                // 같은 줄의 경우
                newOverlay.push(
                        <div
                            key={line}
                            className="absolute left-16 bg-blue-500 opacity-50 h-6 z-0"
                            style={{
                                top: `${line * rem(1.5)}px`,
                                width: `${getTextLength(curline.substring(startChar, endChar))}px`,
                                left: `${cursorPos.get(1)}px`
                            }}
                        />
                );
                break;
            } else  {
                if (line === startLine) {
                    // 시작 줄
                    newOverlay.push(
                            <div
                                key={line}
                                className="absolute left-16 bg-blue-500 opacity-50 h-6 z-0"
                                style={{
                                    top: `${line * rem(1.5)}px`,
                                    width: `${getTextLength(curline.substring(startChar))}px`,
                                    left: `${cursorPos.get(1)}`
                                }}
                            />
                    ); 
                } else if (line === endLine) {
                    // 끝 줄
                    newOverlay.push(
                            <div
                                key={line}
                                className="absolute left-16 bg-blue-500 opacity-50 h-6 z-0"
                                style={{
                                    top: `${line * rem(1.5)}px`,
                                    width: `${getTextLength(curline.substring(0, endChar))}px`,
                                    left: '64px'
                                }}
                            />
                    );
                } else {
                    // 중간 줄
                    newOverlay.push(
                            <div
                                key={line}
                                className="absolute left-16 bg-blue-500 opacity-50 h-6 z-0"
                                style={{
                                    top: `${line * rem(1.5)}px`,
                                    width: `${getTextLength(curline)}px`,
                                    left: '64px'
                                }}
                            />
                    );
                }
            }
        }
        setOverlay(newOverlay);
    }, [codeLines, selectionEnd]);

    return (
        <>
            {overlays.map((el:JSX.Element) => el)}
        </>
    );
};

export default SelectionOverlay;