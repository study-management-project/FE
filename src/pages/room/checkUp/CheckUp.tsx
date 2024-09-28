import { useEffect, useState, useRef } from "react";
import CheckUpVoteButton from "./CheckUpVoteButton";
import { Sock } from "../../../utils/socket/Socket";

type CheckUpProps = {
    onSubmit: (title: string) => void;
    isLogin: React.MutableRefObject<boolean>;
    sock: React.MutableRefObject<Sock>;
};

const CheckUp = ({ onSubmit, isLogin, sock }: CheckUpProps) => {
    const [title, setTitle] = useState<string>("");
    const [showVoteButtons, setShowVoteButtons] = useState<boolean>(false);
    const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(isLogin.current); // 폼 표시 여부 상태
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        if (title.trim() === "") {
            // title이 비어있다면 함수 종료
            return;
        }
        onSubmit(title); // Q&A 제목을 RoomPage로 전달
        setSubmittedTitle(title); // 제목 저장
        setFormVisible(false); // 폼 숨기기
        setShowVoteButtons(true); // 투표 버튼 표시
        sock.current.sendCheckUp(title);
    };

    // Enter 키로 Q&A를 시작할 수 있도록 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 줄바꿈 방지
            handleSubmit(); // Q&A 시작
        }
    }

    const handleVote = (vote: "이해했어요" | "아직이요") => {
        console.log(`사용자가 ${vote}를 선택했습니다.`); ``
        setShowVoteButtons(true);
    };

    useEffect(() => {
        if (!isLogin.current) {
            setFormVisible(false);
            setSubmittedTitle(title);
            setShowVoteButtons(true);
        }
    }, [isLogin.current, title]);

    // textarea 자동 높이 조절을 위한 useEffect
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [title]);

    return (
        <div className="mb-4 rounded h-1/4 bg-white p-5 shadow-md font-noto">
            {formVisible ? (
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <label className="mb-4 w-full text-left text-base font-bold text-black">
                        Q&A 내용
                    </label>
                    <textarea
                        ref={textareaRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="mb-4 w-full max-h-16 resize-none rounded border border-gray-300 p-2 font-noto text-sm"
                        placeholder="Q&A 진행할 내용을 입력하세요"
                        rows={2}
                    />
                    <div className="flex w-full justify-end">
                        <button
                            type="submit"
                            className="items-center rounded bg-blue-500 p-2 text-xs text-white hover:bg-blue-600"
                        >
                            조사 시작
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex-col text-black font-noto">
                    <div className="flex font-bold">
                        <img
                            src="/icons/iconInformation.png"
                            alt="정보 아이콘"
                            className="mr-2 mb-4 h-4 w-4"
                        />
                        <p className="mb-4 text-sm">{submittedTitle}</p>
                    </div>
                    <p className="mb-4 justify-center break-words text-sm">지금까지 학습한 내용 잘 이해했나요?</p>
                </div>
            )}

            {showVoteButtons && (
                <div>
                    <CheckUpVoteButton onVote={handleVote} />
                </div>
            )}
        </div>
    );
};

export default CheckUp;
