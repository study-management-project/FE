import { useState } from 'react';

const QuestionChat = () => {
    const [question, setQuestion] = useState<string>(''); // 현재 입력된 질문
    const [questions, setQuestions] = useState<string[]>([]); // 제출된 질문 리스트

    const handleQuestionSubmit = () => {
        if (question.trim()) {  // 질문이 비어 있지 않을 때만 실행
            setQuestions([...questions, question]); // 기존 질문 리스트에 새로운 질문 추가
            setQuestion(''); // 질문 제출 후 입력창 초기화
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold mb-2">질문 채팅방</h3>

            {/* 제출된 질문 리스트 출력 */}
            <div className="mb-4 h-64 overflow-y-auto border border-gray-300 p-2 rounded bg-gray-50">
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={index} className="p-2 mb-2 bg-gray-100 rounded">
                            {index + 1}. {q} {/* 질문을 리스트 형식으로 출력 */}
                        </div>
                    ))
                ) : (
                    <p>아직 질문이 없습니다. 질문을 입력해 보세요!</p>
                )}
            </div>

            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
    );
};

export default QuestionChat;
