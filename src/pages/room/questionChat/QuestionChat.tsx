import { useState, useRef, useEffect } from "react";

const QuestionChat = () => {
  const [question, setQuestion] = useState<string>(""); // 현재 입력된 질문
  const [questions, setQuestions] = useState<string[]>([]); // 제출된 질문 리스트
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      // 질문이 비어 있지 않을 때만 실행
      setQuestions([...questions, question]); // 기존 질문 리스트에 새로운 질문 추가
      setQuestion(""); // 질문 제출 후 입력창 초기화
    }
  };

  // textarea 자동 높이 조절을 위한 useEffect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  return (
    <div className="bg-white p-5 rounded shadow-md font-noto text-base">
      <p className="font-bold mb-4">질문 채팅방</p>

      {/* 제출된 질문 리스트 출력 */}
      <div className="mb-4 h-64 overflow-y-auto border border-gray-300 rounded bg-gray-50 p-2 text-sm">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="p-2 mb-2 bg-gray-100 rounded max-w-lg">
              {index + 1}. {q} {/* 질문을 리스트 형식으로 출력 */}
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
        className="w-full p-2 border border-gray-300 rounded resize-none font-noto text-sm"
        placeholder="궁금한 점은 여기에 질문해 보세요!"
        rows={4}
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
