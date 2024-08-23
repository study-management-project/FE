import { ReactNode, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';
import Drawer from '../../components/GlassDrawer/Drawer';
import RoomHeader from '../../components/RoomHeader';
import CodeEditor from '../../components/CodeEditor/CodeEditor';

const RoomPage = () => {
  // 파라미터
  const params:Readonly<Partial<{ roomId: string; }>> = useParams<{ roomId: string }>();;

  const [snapshots, setSnapshots] = useState<CodeSnapshot[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const month = useRef<number>(new Date().getMonth());
  const commentPage = useRef<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [draerChildren, setDrawerChildren] = useState<ReactNode>(<div>Hello</div>);

   async function getData():Promise<void> {
    setSnapshots([...await CodeSnapshotRepository.getInstance().getSnapshots(month.current)]);
    setComments([...await CommentRepository.getInstance().getComments(commentPage.current)]);
  }

  useEffect(() => {
    getData();
  },[])

  useEffect(() => {
    console.log(snapshots);
  },[snapshots])

  useEffect(() => {
    console.log(comments);
  },[comments])

  return (
    <div className='bg-[#212121] w-full h-full'>
      <RoomHeader isOpen={open} setOpen={setOpen}/>
      <div className='relative h-full'>
        <CodeEditor />
        <Drawer title={drawerTitle} children={draerChildren} isOpen={open} setOpen={setOpen}></Drawer>
      </div>
    </div>
  )
}

export default RoomPage