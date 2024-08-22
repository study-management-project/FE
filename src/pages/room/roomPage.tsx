import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';

const RoomPage = () => {
  // 파라미터
  const params:{roomId:string} = useParams<{ roomId: string }>();;
  const [snapshots, setSnapshots] = useState<CodeSnapshot[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const month = useRef<number>(new Date().getMonth());
  const commentPage = useRef<number>(0);

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
    <div>
      room : {params.roomId}
    </div>
  )
}

export default RoomPage