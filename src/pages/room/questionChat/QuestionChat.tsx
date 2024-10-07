import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { Sock } from "../../../utils/socket/Socket";

const QuestionChat = ({ questions, sock }: { questions: string[], sock: React.MutableRefObject<Sock> }) => {
  const [question, setQuestion] = useState<string>(""); // 현재 입력된 질문
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      sock.current.sendComment(question);
      setQuestion(""); // 질문 제출 후 입력창 초기화
    }
  };

  // Enter 키로 질문 제출 가능하도록 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleQuestionSubmit(); // 질문 제출
    }
  };

  // textarea 자동 높이 조절을 위한 useEffect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

  }, [question]);

  // 새로운 질문이 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [questions]);

  return (
    <div className="bg-white h-2/3 p-5 rounded shadow-md font-noto text-base">
      <p className="font-bold mb-4">질문 채팅방</p>

      {/* 제출된 질문 리스트 출력z */}
      <div
        ref={chatBoxRef}
        className="mb-4 h-3/5 overflow-y-auto border border-gray-300 rounded bg-gray-50 p-2 text-sm"
      >
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="p-2 mb-2 bg-gray-100 rounded overflow-y-auto break-words whitespace-pre-wrap">
              {q} {/* 질문을 리스트 형식으로 출력 */}
            </div>
          ))
        ) : (
          <p className="text-gray-400">아직 질문이 없습니다.</p>
        )}
      </div>

      <textarea
        ref={textareaRef}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full max-h-28 p-2 border border-gray-300 rounded resize-none font-noto text-sm overflow-y-auto"
        placeholder="궁금한 점은 여기에 질문해 보세요!"
        rows={3}
      />
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleQuestionSubmit}
          className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
        >
          질문 제출
        </button>
      </div>
    </div>
  );
};

export default QuestionChat;
