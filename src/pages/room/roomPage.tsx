import { ReactNode, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnapshot } from '../../model/CodeSnapshot';
import { CodeSnapshotRepository } from '../../services/CodeSnapshotRepository';
import { CommentRepository } from '../../services/CommentRepository';
import { Comment } from '../../model/Comment';
import Drawer from '../../components/GlassDrawer/Drawer';
import RoomHeader from '../../components/RoomHeader';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
// import { Sock } from '../../utils/socket/Socket';
import { RoomInfo } from '../../model/RoomInfo';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';
import Calendar from '../../components/Calendar/Calendar';
import CodeSnapshotUI from '../../components/CodeSnapshot/CodeSnapshot';


const RoomPage = () => {
  // 마운트 시 useEffect 실행 방지
  const [isMounted,setMounted] = useState<boolean>(false);
  const [roomMounted, setRoomMounted] = useState<boolean>(false);
  // 처음 표시되어야할 코드를 표시할 때 메세지 송신 방지용 flag
  const [isInitial, setInitial] =useState<boolean>(true); 
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
  // 스냅샷들
  const [snapshots, setSnapshots] = useState<Map<number, Map<number, Map<number, any>>>>(initialSnapshots);
  // 코멘트들
  const [comments, setComments] = useState<Comment[]>([]);
  // 소켓 객체
  // const sock = useRef<Sock>(Sock.createInstance());
  
  // drawer 관련
  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [drawerChildren, setDrawerChildren] = useState<ReactNode>(<CodeSnapshotUI year={year} month={month} snapshots={snapshots} setIsReceived={setIsReceived} setCode={setCode} setSnapshots={setSnapshots} roomId={params.roomId}/>);


  // 아이콘이 클릭 되었을 때 동작
  const onIconClicked = (event:React.MouseEvent) => {
    const clickedTitle:string|null = event.currentTarget.id;
    if (clickedTitle) {
      setDrawerTitle((prevData) => {
        if (prevData === clickedTitle) {
          setOpen(!open);
        } else {
          if (clickedTitle === "이해도 조사") {
            setDrawerChildren(<div>이해도 조사</div>)
          }
          else {
            setDrawerChildren(<CodeSnapshotUI year={year} month={month} snapshots={snapshots} setIsReceived={setIsReceived} setCode={setCode} setSnapshots={setSnapshots} roomId={params.roomId}/>)
          }
          setOpen(true);
        }
        return clickedTitle;
      });
    }
  }



  // 코드 업데이트 로직
  const updateCode = async (receivedCode:string) => {
    setIsReceived(true);
    setCode((prevCode) => {
      if (receivedCode == prevCode) {
        return prevCode
      }
      else {
        return receivedCode;
      }
    });
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
    // sock.current.connect(['code'],[updateCode]);
    // await sock.current.joinRoom(params.roomId);
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
    // window.addEventListener('beforeunload', () => {
    //   sock.current.unsubscribe();
    // })

    // return () => {
    //   sock.current.unsubscribe();
    //   window.removeEventListener('beforeunload', () => {
    //     sock.current.unsubscribe();
    //   });
    // }

  },[])

  const updateSnapshots = async (prevData:Map<number, Map<number, Map<number, any>>>, snapshotDate:number, snapshotDates:number[]):Promise<Map<number, Map<number, Map<number, any>>>> => {
    const yearMap:Map<number, Map<number, Map<number, any>>> = new Map(prevData); // Clone the outer map
    const monthMap:Map<any, any> = new Map(yearMap.get(year) || new Map()); // Clone the inner month map
    const dateMap:Map<unknown, unknown> = new Map(monthMap.get(month) || new Map()); // Clone the inner date map
    
    const response:AxiosResponse = await axi.get(`room/${params.roomId}/snapshot/${year}/${month}/${snapshotDates[snapshotDates.length-1]}`);
    const dailySnapshot:CodeSnapshot[] = response.data.map((el:any) => CodeSnapshot.fromJson(el));

    dateMap.set(snapshotDate, dailySnapshot);
    monthMap.set(month, dateMap);
    yearMap.set(year, monthMap);

    return yearMap;
  }

  // 방 정보 받아왔을 때 스냅샷 업데이트
  useEffect(() => {
    if (roomMounted === false) {
      setRoomMounted(true);
    }
    else {
      const updateAllSnapshots = async () => {
        const snapshotDates = roomInfo.getHaveSnapshotDate();
        for (const snapshotDate of snapshotDates) {
          const updatedSnapshots = await updateSnapshots(snapshots, snapshotDate, snapshotDates);
          
          setSnapshots(updatedSnapshots);
        }
  
        setCode(roomInfo.getContent());
      };
      updateAllSnapshots(); // 비동기 함수 호출
    }
  }, [roomInfo]);


  // 코드 pub
  useEffect(() => {
    if (!isMounted) {
      
      // 첫 마운트 시에는 아무 동작도 하지 않음
      setMounted(true);
      return; 
    }

    if (isInitial) {
      // 첫 코드 표시 시에는 메세지를 보내지 않음
      setInitial(false);
      return;
    }

    if (isReceived) {
      setIsReceived(false); // 수신된 경우에는 그냥 상태 초기화
      return;
    }

    // 디바운싱 및 코드 송신
    if (timer.current) {
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(() => {
      // 코드가 변경된 후에만 송신
      // sock.current.sendCode(code);

      // 송신 후 잠시 후에 isReceived를 false로 리셋
      setTimeout(() => {
        setIsReceived(false);
      }, 100); // 100ms 정도 후에 초기화 (이 값은 조정 가능)
    }, 500);

    return () => {
      clearTimeout(timer.current); // cleanup 함수
    };
  }, [code]);

  useEffect(() => {
    console.log(snapshots);
  },[snapshots])

  const focus = ():void => {
    let textarea:HTMLElement|null = document.getElementById('text-area');
    if (textarea) {
      textarea.focus();
    }
    textarea = null;
  }


  return (
    <div className='bg-[#212121] w-full min-h-screen max-h-screen h-auto overflow-auto'>
      <RoomHeader isOpen={open} setOpen={setOpen} onIconClicked={onIconClicked}/>
      <div className='relative min-h-lvh' onClick={focus}>
        <CodeEditor code={code} setCode={setCode}/>
        <Drawer title={drawerTitle} children={drawerChildren} isOpen={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default RoomPage