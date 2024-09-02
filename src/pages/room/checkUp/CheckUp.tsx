import { useState } from "react";
import CheckUpVoteButton from "./checkUpVoteButton";

type CheckUpProps = {
    onSubmit: (title: string) => void;
};

const CheckUp = ({ onSubmit }: CheckUpProps) => {
    const [title, setTitle] = useState<string>('');
    const [showVoteButtons, setShowVoteButtons] = useState<boolean>(false);
    const [showChatInput, setShowChatInput] = useState<boolean>(false);
    const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(true); // 폼 표시 여부 상태

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(title); // 이해도조사 제목을 RoomPage로 전달
        setSubmittedTitle(title); // 제목 저장
        setFormVisible(false); // 폼 숨기기
        setShowVoteButtons(true); // O/X 버튼 표시
    };

    const handleVote = (vote: 'O' | 'X') => {
        console.log(`사용자가 ${vote}를 선택했습니다.`);
        setShowVoteButtons(true);
        setShowChatInput(true); // 질문 입력창 표시
    };

    const handleQuestionSubmit = () => {
        // 질문 제출 로직 추가
        console.log("질문 제출!");
    };


    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            {formVisible ? (
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="text-black text-lg">Q&A 내용:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        placeholder="Q&A 진행할 내용을 입력하세요"
                    />
                    <button
                        type="submit"
                        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded">
                        조사 시작
                    </button>
                </form>
            ) : (
                <div className="mt-4 text-black flex flex-col">
                    <div className="flex items-center">
                        <img src="/icons/iconInformation.png" alt="정보 아이콘" className="w-4 h-4 mr-2" />
                        <p className="text-base">{submittedTitle}</p>
                    </div>
                    <p className="text-base">지금까지 학습한 내용 잘 이해했나요?</p>
                </div>
            )}

            {showVoteButtons && (
                <div className="mt-4">
                    <CheckUpVoteButton onVote={handleVote} />
                </div>
            )}

            {showChatInput && (
                <div className="mt-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="궁금한 점은 여기에 질문해 보세요!"
                    />
                    <button
                        type="button"
                        onClick={handleQuestionSubmit}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                    >
                        질문 제출
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckUp;
