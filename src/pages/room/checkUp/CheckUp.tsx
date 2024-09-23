import { useEffect, useState, useRef } from "react";
import CheckUpVoteButton from "./CheckUpVoteButton";

type CheckUpProps = {
    onSubmit: (title: string) => void;
};

const CheckUp = ({ onSubmit }: CheckUpProps) => {
    const [title, setTitle] = useState<string>('');
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

    const handleVote = (vote: '이해했어요' | '아직이요') => {
        console.log(`사용자가 ${vote}를 선택했습니다.`);
        setShowVoteButtons(true);
    };

    // textare 자동 높이 조절을 위한 useEffect
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [title]);

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-4"
            style={{ fontFamily: 'Noto Sans' }}>
            {formVisible ? (
                <form onSubmit={handleSubmit} className="flex flex-col items-start w-full">
                    <label className="text-black font-bold w-full text-left mb-4"
                        style={{ fontSize: '1rem' }}>Q&A 내용</label>
                    <textarea
                        ref={textareaRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        style={{ fontFamily: 'Noto Sans', fontSize: '0.875rem', paddingLeft: '10px', resize: 'none' }}
                        placeholder="Q&A 진행할 내용을 입력하세요"
                        rows={2}
                    />
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 p-2"
                            style={{ fontSize: '0.75rem', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            조사 시작
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-black flex flex-col item-start" style={{ fontFamily: 'Noto Sans', fontSize: '1rem' }}>
                    <div className="flex items-center font-bold">
                        <img src="/icons/iconInformation.png" alt="정보 아이콘" className="w-4 h-4 mr-2 mb-4" />
                        <p className="text-base mb-4" style={{ fontSize: '0.875rem' }}>{submittedTitle}</p>
                    </div>
                    <p className="text-base mb-4" style={{ fontSize: '0.875rem' }}>지금까지 학습한 내용 잘 이해했나요?</p>
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
