import { ReactNode, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';
import Drawer from '../../components/GlassDrawer/Drawer';
import RoomHeader from '../../components/RoomHeader';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import CheckUp from './checkUp/CheckUp';
import QuestionChat from './questionChat/QuestionChat';

const RoomPage = () => {
  const params: Readonly<Partial<{ roomId: string; }>> = useParams<{ roomId: string }>();

  const [snapshots, setSnapshots] = useState<CodeSnapshot[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [questions, setQuestions] = useState<string[]>([]); // 질문 목록 상태 추가


  const month = useRef<number>(new Date().getMonth());
  const commentPage = useRef<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [drawerChildren, setDrawerChildren] = useState<ReactNode>(<div>Hello</div>);

  async function getData(): Promise<void> {
    setSnapshots(await CodeSnapshotRepository.getInstance().getSnapshots(month.current));
    setComments(await CommentRepository.getInstance().getComments(commentPage.current));
  }

  useEffect(() => {
    getData();
  }, []);

  const handleIconClick = (type: 'checkUp' | 'codeSnapshot') => {
    if (type === 'codeSnapshot') {
      setDrawerTitle('코드 스냅샷');
      setDrawerChildren(<div>{/* 코드 스냅샷 관련 내용을 여기에 추가 */}</div>);
    } else if (type === 'checkUp') {
      setDrawerTitle('Q&A');
      setDrawerChildren(
        <>
          <CheckUp onSubmit={(title) => handleCheckUpSubmit(title)} />
          <QuestionChat questions={questions} onSubmit={handleQuestionSubmit} />
        </>
      );
    }
  };

  const handleCheckUpSubmit = (title: string) => {
    console.log(`Q&A 내용: ${title}`);
    setDrawerTitle('Q&A 진행 중');
  };

  const handleQuestionSubmit = (question: string) => {
    setQuestions([...questions, question]); // 새로운 질문 추가
    console.log(`질문 제출: ${question}`);
  };

  return (
    <div className='bg-[#212121] w-full h-full'>
      <RoomHeader isOpen={open} setOpen={setOpen} onIconClick={handleIconClick} />
      <div className='relative h-full'>
        <CodeEditor />
        <Drawer title={drawerTitle} children={drawerChildren} isOpen={open} setOpen={setOpen}></Drawer>
      </div>
    </div>
  );
};

export default RoomPage;
