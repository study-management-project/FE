import { useEffect, useState, useRef } from "react";
import CheckUpVoteButton from "./CheckUpVoteButton";

type CheckUpProps = {
    onSubmit: (title: string) => void;
};

const CheckUp = ({ onSubmit }: CheckUpProps) => {
    const [title, setTitle] = useState<string>("");
    const [showVoteButtons, setShowVoteButtons] = useState<boolean>(false);
    const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(true); // 폼 표시 여부 상태
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(title); // 이해도조사 제목을 RoomPage로 전달
        setSubmittedTitle(title); // 제목 저장
        setFormVisible(false); // 폼 숨기기
        setShowVoteButtons(true); // 투표 버튼 표시
    };

    const handleVote = (vote: "이해했어요" | "아직이요") => {
        console.log(`사용자가 ${vote}를 선택했습니다.`);
        setShowVoteButtons(true);
    };

    // textarea 자동 높이 조절을 위한 useEffect
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [title]);

    return (
        <div className="mb-4 rounded bg-white p-5 shadow-md font-noto">
            {formVisible ? (
                <form onSubmit={handleSubmit} className="flex w-full flex-col items-start">
                    <label className="mb-4 w-full text-left text-base font-bold text-black">
                        Q&A 내용
                    </label>
                    <textarea
                        ref={textareaRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4 w-full resize-none rounded border border-gray-300 p-2 font-noto text-sm"
                        placeholder="Q&A 진행할 내용을 입력하세요"
                        rows={2}
                    />
                    <div className="flex w-full justify-end">
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded bg-blue-500 p-2 text-xs text-white hover:bg-blue-600"
                        >
                            조사 시작
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col text-black font-noto">
                    <div className="flex items-center font-bold">
                        <img
                            src="/icons/iconInformation.png"
                            alt="정보 아이콘"
                            className="mr-2 mb-4 h-4 w-4"
                        />
                        <p className="mb-4 text-sm">{submittedTitle}</p>
                    </div>
                    <p className="mb-4 text-sm">지금까지 학습한 내용 잘 이해했나요?</p>
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
