import { ReactNode, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';
import Drawer from '../../components/GlassDrawer/Drawer';
import RoomHeader from '../../components/RoomHeader';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import sock, { Sock } from '../../utils/socket/Socket';
import { RoomInfo } from '../../model/RoomInfo';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';

const RoomPage = () => {
  // 파라미터
  const params:Readonly<Partial<{ roomId: string; }>> = useParams<{ roomId: string }>();;
  // 방 정보
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(new RoomInfo("","","","",[],[],[]));
  // 코드
  const [code, setCode] = useState<string>(""); 
  // 스냅샷들 (년:월:일:[])
  const [snapshots, setSnapshots] = useState<Map<number,Map<number,Map<number,CodeSnapshot[]>>>>();
  // 코멘트들
  const [comments, setComments] = useState<Comment[]>([]);

  const month = useRef<number>(new Date().getMonth());
  const commentPage = useRef<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [drawerChildren, setDrawerChildren] = useState<ReactNode>(<div>Hello</div>);


  // const addComment = (comment:Comment):void => {
  //   setComments([...comments,comment])
  // } 

  // const addSnapshot = (snapshot:CodeSnapshot):void => {
  //   setSnapshots([...snapshots,snapshot])
  // }

  // 페이지 로드 시 방 정보, 
  const pageOnload = async() => {
    const response:AxiosResponse<any,any> = await axi.get(`room/${params.roomId}`);
    setRoomInfo(RoomInfo.fromJson(response.data));
    await Sock.connect();
    await Sock.joinRoom(params.roomId);
    // Sock.subscribe('code'
    //   , setCode;
    // );
    // Sock.subscribe('comment'
    //   , addComment
    // );
    // Sock.subscribe('snapshot'
    //   , addSnapshot
    // );
    // Sock.subscribe('checkup');
    // 교사용 추가 예정
  }

  // 페이지 mount시
  useEffect(() => {

    pageOnload();
    
    // 브라우저 종료 시 unsubscribe;
    window.addEventListener('beforeunload', () => {
      Sock.unsubscribe();
    })

    return () => {
      Sock.unsubscribe();
      window.removeEventListener('beforeunload', () => {
        Sock.unsubscribe();
      });
    }

  },[])

  useEffect(() => {
    console.log(roomInfo);
  },[roomInfo]);

  return (
    <div className='bg-[#212121] w-full min-h-screen max-h-screen h-auto overflow-auto'>
      <RoomHeader isOpen={open} setOpen={setOpen}/>
      <div className='relative min-h-lvh'>
        <CodeEditor code={code} setCode={setCode}/>
        <Drawer title={drawerTitle} children={drawerChildren} isOpen={open} setOpen={setOpen}></Drawer>
      </div>
    </div>
  )
}

export default RoomPage