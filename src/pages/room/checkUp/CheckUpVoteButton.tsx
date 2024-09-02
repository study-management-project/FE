import { useState } from "react";

type CheckUpVoteButtonsProps = {
    onVote: (vote: '이해했어요' | '아직이요') => void;
};

const CheckUpVoteButton = ({ onVote }: CheckUpVoteButtonsProps) => {
    const [disabled, setDisabled] = useState(false);
    const [clickedVote, setClickedVote] = useState<'이해했어요' | '아직이요' | null>(null);

    const handleClick = (vote: '이해했어요' | '아직이요') => {
        setDisabled(true);
        setClickedVote(vote); // 클릭한 버튼의 투표 저장
        onVote(vote);
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={() => handleClick('아직이요')}
                disabled={disabled}
                className={`p-2 rounded ${disabled ? 'bg-gray-400' : 'bg-blue-200'} ${clickedVote === '아직이요' ? 'text-white' : 'text-blue-600'}`}
            >
                아직이요
            </button>

            <button
                onClick={() => handleClick('이해했어요')}
                disabled={disabled}
                className={`p-2 rounded ${disabled ? 'bg-gray-400' : 'bg-blue-600'} ${clickedVote === '이해했어요' ? 'text-white' : 'text-white'}`}
            >
                이해했어요
            </button>
        </div>
    );
};

export default CheckUpVoteButton;
