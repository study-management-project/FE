import { ReactNode, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';
import Drawer from '../../components/GlassDrawer/Drawer';
import RoomHeader from '../../components/RoomHeader';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import { Sock } from '../../utils/socket/Socket';
import { RoomInfo } from '../../model/RoomInfo';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';

const RoomPage = () => {
  const [isMounted,setMounted] = useState<boolean>(false);

  // 내가 받은 것인지, 남에게서 받은 것인지 판별
  const [isReceived, setIsReceived] = useState<boolean>(false);
  // 파라미터
  const params:Readonly<Partial<{ roomId: string; }>> = useParams<{ roomId: string }>();;
  // 디바운싱 timer
  const timer:React.MutableRefObject<ReturnType<typeof setTimeout>|undefined> = useRef(undefined);
  // 날짜
  const todayDate = useRef<Date>(new Date());
  const year:number = todayDate.current.getFullYear();
  const month:number = todayDate.current.getMonth()+1;
  const commentPage = useRef<number>(0);
  // 방 정보
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(new RoomInfo("","","","",[],[],[]));
  // 코드
  const [code, setCode] = useState<string>(""); 
  // 스냅샷들 (년:월:일:[])
  const initialSnapshots: Map<number, Map<number, Map<number, any>>> = new Map([
    [
      year,
      new Map([
        [month, new Map<number, any>()],
      ]),
    ],
  ]);
  const [snapshots, setSnapshots] = useState<Map<number, Map<number, Map<number, any>>>>(initialSnapshots);
  // 코멘트들
  const [comments, setComments] = useState<Comment[]>([]);

  const sock = useRef<Sock>(Sock.createInstance());
  

  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [drawerChildren, setDrawerChildren] = useState<ReactNode>(<div>Hello</div>);

  // received Code도 useState로 관리해볼까?
  const updateCode = (receivedCode:string) => {
    setCode((prevCode) => {
      if (receivedCode == prevCode) {
        return prevCode
      }
      else {

        return receivedCode;
      }
    });
    setTimeout(() => {
      setIsReceived(false);
    },0);
  }
  // const addComment = (comment:Comment):void => {
  //   setComments([...comments,comment])
  // } 

  // const addSnapshot = (snapshot:CodeSnapshot):void => {
  //   setSnapshots([...snapshots,snapshot])
  // }

  // 페이지 로드 시 방 정보, 
  const pageOnload = async() => {
    const response:AxiosResponse = await axi.get(`room/${params.roomId}`);
    setRoomInfo(RoomInfo.fromJson(response.data));
    await sock.current.connect();
    await sock.current.joinRoom(params.roomId);
    sock.current.subscribe('code', updateCode);
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
      sock.current.unsubscribe();
    })

    return () => {
      sock.current.unsubscribe();
      window.removeEventListener('beforeunload', () => {
        sock.current.unsubscribe();
      });
    }

  },[])

  useEffect(() => {
    const snapshotDates = roomInfo.getHaveSnapshotDate();
  
    snapshotDates.forEach((snapshotDate: any) => {
      setSnapshots((prevData) => {
        const yearMap:Map<number, Map<number, Map<number, any>>> = new Map(prevData); // Clone the outer map
        const monthMap:Map<any, any> = new Map(yearMap.get(year) || new Map()); // Clone the inner month map
        const dateMap:Map<unknown, unknown> = new Map(monthMap.get(month) || new Map()); // Clone the inner date map
  
        dateMap.set(snapshotDate, []);
        monthMap.set(month, dateMap);
        yearMap.set(year, monthMap);
  
        return yearMap;
      });
    });
  }, [roomInfo]);

  useEffect(() => {
    console.log(snapshots);
  },[snapshots])

  // 코드 pub
  useEffect(() => {
    if (!isMounted) {
      setMounted(!isMounted);
    }
    else {
      console.log(timer.current);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      else {
          timer.current = setTimeout(() => {
            if (!isReceived) {
              sock.current.sendCode(code);
            }
            else {
              setIsReceived(false);
            }
          },500)
          setTimeout(() => {
            timer.current = undefined;
          },0)
        } 
      }
  },[code])

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