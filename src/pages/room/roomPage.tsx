import { ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CodeSnapshot } from "../../model/CodeSnapshot";
import Drawer from "../../components/GlassDrawer/Drawer";
import RoomHeader from "../../components/RoomHeader";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { Sock } from "../../utils/socket/Socket";
import { RoomInfo } from "../../model/RoomInfo";
import { AxiosResponse } from "axios";
import axi from "../../utils/axios/Axios";
import CodeSnapshotUI from "../../components/CodeSnapshot/CodeSnapshotUI";
import { IMessage } from "@stomp/stompjs";
import { Map } from "immutable";
import CheckUp from "./checkUp/CheckUp";
import QuestionChat from "./questionChat/QuestionChat";

const RoomPage = () => {
  // 마운트 시 useEffect 실행 방지
  const [isMounted, setMounted] = useState<boolean>(false);
  const [roomMounted, setRoomMounted] = useState<boolean>(false);
  // 처음 표시되어야할 코드를 표시할 때 메세지 송신 방지용 flag
  const [isInitial, setInitial] = useState<boolean>(true);
  // 내가 받은 것인지, 남에게서 받은 것인지 판별
  const [isReceived, setIsReceived] = useState<boolean>(false);
  // 파라미터
  const params: Readonly<Partial<{ roomId: string }>> = useParams<{
    roomId: string;
  }>();
  // 디바운싱 timer
  const timer: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef(undefined);
  // 날짜
  const todayDate = useRef<Date>(new Date());
  const year: number = todayDate.current.getFullYear();
  const month: number = todayDate.current.getMonth() + 1;
  const date: number = todayDate.current.getDate();
  const stringYear: string = year.toString();
  const stringMonth: string = month.toString();
  const stringDate: string = date.toString();

  // textarea disabled (유저 권한에 따름)
  // const [disabled, setDisabled] = useState<boolean>(true);
  const isLogin = useRef<boolean>(false);

  // const commentPage = useRef<number>(0);
  // 스냅샷 타이틀
  const [snapshotTitle, setSnapshotTitle] = useState<string>(
    `${year}-${month.toString().length == 2 ? month : "0" + month}-${date.toString().length == 2 ? date : "0" + date
    }`
  );

  // 방 정보
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(new RoomInfo("", "", ""));
  // 코드
  const [code, setCode] = useState<string>("");
  // 코드 스냅샷 확인 후 되돌리기 위해 이전 코드를 저장
  const [prevCode, setPrevCode] = useState<string | undefined>(undefined);
  // 스냅샷들 (년:월:일:[])
  const initialSnapshots: Map<string, Map<string, Map<string, any>>> = Map([
    [stringYear, Map([[stringMonth, Map([[stringDate, []]])]])],
  ]);
  // 스냅샷들
  const [snapshots, setSnapshots] =
    useState<Map<string, Map<string, Map<string, any>>>>(initialSnapshots);
  // 선택된 날짜에 존재하는 코드 스냅샷들
  const [dailySanpshots, setDailySnapshots] = useState<CodeSnapshot[]>([]);

  // 질문 목록 상태 추가
  const [questions, setQuestions] = useState<string[]>([]);

  // 소켓 객체
  const sock = useRef<Sock>(Sock.createInstance());

  // drawer 관련
  const [open, setOpen] = useState<boolean>(false);
  const [checkUpTitle, setCheckUpTitle] = useState<string>("none")


  const saveSnapshot = (): void => {
    const savedSnapshot: CodeSnapshot = new CodeSnapshot(
      snapshotTitle,
      code,
      new Date().toString()
    );
    sock.current.sendSnapshot(params.roomId, savedSnapshot);
    if (
      snapshots.getIn([stringYear, stringMonth, stringDate], undefined) ===
      undefined
    ) {
      setSnapshots(
        (prevSnapshots: Map<string, Map<string, Map<string, any>>>) => {
          return Map(
            prevSnapshots.setIn([stringYear, stringMonth, stringDate], [])
          );
        }
      );
    }
  };


  const updateQuestions = (messageBody: string) => {
    setQuestions((prevQuestions) => {
      return [...prevQuestions, messageBody];
    });
  }

  // 아이콘이 클릭 되었을 때 동작
  const onIconClicked = (event: React.MouseEvent) => {
    const clickedTitle: string | null = event.currentTarget.id;
    if (clickedTitle) {
      setDrawerTitle((prevData) => {
        if (prevData === clickedTitle) {
          setOpen(!open);
        } else {
          if (clickedTitle === "Q&A") {
            // Q&A와 질문 채팅 UI 추가
            setDrawerChildren(
              <div className="flex flex-col h-full w-full px-4">
                <CheckUp onSubmit={(title) => handleCheckUpSubmit(title)} isLogin={isLogin} sock={sock} setCheckUpTitle={setCheckUpTitle} checkUpTitle={checkUpTitle} />
                <QuestionChat
                  questions={questions}
                  sock={sock}
                />
              </div>
            );
          } else {
            setDrawerChildren(
              <CodeSnapshotUI
                year={year}
                month={month}
                snapshots={snapshots}
                setIsReceived={setIsReceived}
                setCode={setCode}
                setSnapshots={setSnapshots}
                roomId={params.roomId}
                dailySnapshots={dailySanpshots}
                setDailySnapshots={setDailySnapshots}
                savePrevCode={savePrevCode}
              />
            );
          }
          setOpen(true);
        }
        return clickedTitle;
      });
    }
  };

  useEffect(() => {
    if (drawerTitle != "코드 스냅샷") {
      setDrawerChildren(
        <div className="flex flex-col h-full w-full px-4">
          <CheckUp onSubmit={(title) => handleCheckUpSubmit(title)} isLogin={isLogin} sock={sock} setCheckUpTitle={setCheckUpTitle} checkUpTitle={checkUpTitle} />
          <QuestionChat
            questions={questions}
            sock={sock}
          />
        </div>
      );
    }
  }, [checkUpTitle])

  const handleCheckUpSubmit = (title: string) => {
    setDrawerTitle("Q&A 진행 중");
  };

  const savePrevCode = (): void => {
    if (prevCode === undefined) {
      setPrevCode(code);
    }
  };

  const restoreCode = (): void => {
    setIsReceived(true);
    if (prevCode !== undefined) {
      setCode(prevCode);
    }
    setPrevCode(undefined);
    setTimeout(() => {
      setIsReceived(false);
    }, 300);
  };

  // 코드 업데이트 로직
  const updateCode = async (receivedCode: string) => {
    setIsReceived(true);
    setCode((prev) => {
      if (receivedCode == prev) {
        return prev;
      } else {
        return receivedCode;
      }
    });
  };
  // const addComment = (comment:Comment):void => {
  //   setComments([...comments,comment])
  // }

  // const addSnapshot = (snapshot:CodeSnapshot):void => {
  //   setSnapshots([...snapshots,snapshot])
  // }

  // 스냅샷이 새로 저장되었다는 메세지를 받을 시 하는 행동
  const getNewSnapshot = async (message: IMessage) => {
    const response = await axi.get(
      `room/${params.roomId}/snapshot/${year}/${month}/${date}`
    );
    const dailySnapshots: number[] = response.data;
    setSnapshots((prevData) => {
      const nextState = prevData.setIn(
        [stringYear, stringMonth, stringDate],
        dailySnapshots
      );
      return nextState;
    });
    setDailySnapshots((prevData) => {
      const jsonMessage: any = JSON.parse(message.toString());
      const lastSnapshot: CodeSnapshot = new CodeSnapshot(
        jsonMessage.title,
        jsonMessage.content,
        jsonMessage.createdDate
      );
      if (prevData.length >= 1) {
        const snapshotDate: number = new Date(
          prevData[0].getCreatedAt()
        ).getDate();
        if (snapshotDate === date) {
          return [lastSnapshot, ...prevData];
        } else {
          const newList: CodeSnapshot[] = [lastSnapshot];
          return newList;
        }
      } else {
        const newList: CodeSnapshot[] = [lastSnapshot];
        return newList;
      }
    });
  };

  const checkUser = async (): Promise<number> => {
    const response: AxiosResponse = await axi.get("check");
    const statusCode = response.status;
    return statusCode;
  }

  // 페이지 로드 시 방 정보,
  const pageOnload = async () => {
    try {
      const statusCode = await checkUser();
      if (statusCode === 200) { // 일반 숫자와 비교
        isLogin.current = true;
      }
    } catch {
      console.log();
    }

    // 방 정보
    const roomInfoResponse: AxiosResponse = await axi.get(
      `room/${params.roomId}`
    );
    setRoomInfo(RoomInfo.fromJson(roomInfoResponse.data));

    // 소켓 연결
    if (isLogin.current === false) {
      sock.current.connect(["code", "snapshot", "comment", "checkup"], [updateCode, getNewSnapshot, updateQuestions, getCheckTitle]);
    } else {
      // 강사일 때
      sock.current.connect(["code", "snapshot", "comment", "result/checkup"], [updateCode, getNewSnapshot, updateQuestions]);
    }
    await sock.current.joinRoom(params.roomId);

    const comments = await axi.get(`room/${params.roomId}/comment`);

    const arr: string[] = [];
    for (let i = 0; i < comments.data.length; i++) {
      arr.push(comments.data[i].content);
    }

    setQuestions(arr);


    // 오늘자 스냅샷
    const dailySnapshotsResponse: AxiosResponse = await axi.get(
      `room/${params.roomId}/snapshot/${year}/${month}/${date}`
    );
    const todayDailySnapshots: CodeSnapshot[] = dailySnapshotsResponse.data.map(
      (el) => CodeSnapshot.fromJson(el)
    );
    setSnapshots((prevData) => {
      const nextState = prevData.setIn(
        [stringYear, stringMonth, stringDate],
        todayDailySnapshots
      );
      return nextState;
    });
    setDailySnapshots(todayDailySnapshots);
  };

  const getCheckTitle = (resivedTitle: string) => {
    const obj = JSON.parse(resivedTitle);
    setCheckUpTitle(obj["title"]);
  }

  useEffect(() => {
    if (drawerTitle !== "코드 스냅샷") {
      setDrawerChildren(
        <div>
          <CheckUp onSubmit={(title) => handleCheckUpSubmit(title)} isLogin={isLogin} sock={sock} setCheckUpTitle={setCheckUpTitle} checkUpTitle={checkUpTitle} />
          <QuestionChat
            questions={questions}
            sock={sock}
          />
        </div>
      );
    }
  }, [questions])

  // 페이지 mount시
  useEffect(() => {
    pageOnload();
    // 브라우저 종료 시 unsubscribe;
    window.addEventListener("beforeunload", () => {
      sock.current.unsubscribe();
    });

    return () => {
      sock.current.unsubscribe();
      window.removeEventListener("beforeunload", () => {
        sock.current.unsubscribe();
      });
    };
  }, []);

  const [drawerTitle, setDrawerTitle] = useState<string>("코드 스냅샷");
  const [drawerChildren, setDrawerChildren] = useState<ReactNode>(
    <CodeSnapshotUI
      year={year}
      month={month}
      snapshots={snapshots}
      setIsReceived={setIsReceived}
      setCode={setCode}
      setSnapshots={setSnapshots}
      roomId={params.roomId}
      dailySnapshots={dailySanpshots}
      setDailySnapshots={setDailySnapshots}
      savePrevCode={savePrevCode}
    />
  );

  // 방 정보 받아왔을 때 스냅샷 업데이트
  useEffect(() => {
    if (roomMounted === false) {
      setRoomMounted(true);
    } else {
      setCode(roomInfo.getContent());
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
      sock.current.sendCode(code);

      // 송신 후 잠시 후에 isReceived를 false로 리셋
      setTimeout(() => {
        setIsReceived(false);
      }, 100); // 100ms 정도 후에 초기화 (이 값은 조정 가능)
    }, 500);

    return () => {
      clearTimeout(timer.current); // cleanup 함수
    };
  }, [code]);

  // Q&A(checkUp) 및 질문 채팅창(questionChat) 포커싱 문제 떄문에 우선 주석 처리해두었습니다.
  // const focus = (): void => {
  //   let textarea: HTMLElement | null = document.getElementById('text-area');
  //   if (textarea) {
  //     textarea.focus();
  //   }
  //   textarea = null;
  // }

  useEffect(() => {
    if (drawerTitle === "코드 스냅샷") {
      setDrawerChildren(
        <CodeSnapshotUI
          year={year}
          month={month}
          snapshots={snapshots}
          setIsReceived={setIsReceived}
          setCode={setCode}
          setSnapshots={setSnapshots}
          roomId={params.roomId}
          dailySnapshots={dailySanpshots}
          setDailySnapshots={setDailySnapshots}
          savePrevCode={savePrevCode}
        />
      );
    }
  }, [snapshots, dailySanpshots]);

  return (
    <div className="bg-[#212121] w-full min-h-screen max-h-screen h-auto overflow-auto">
      <RoomHeader
        isLogin={isLogin}
        onIconClicked={onIconClicked}
        snapshotTitle={snapshotTitle}
        setSnapshotTitle={setSnapshotTitle}
      />
      <div className="relative min-h-lvh" onClick={focus}>
        <CodeEditor
          code={code}
          setCode={setCode}
          prevCode={prevCode}
          saveSnapshot={saveSnapshot}
        />
        <Drawer
          title={drawerTitle}
          children={drawerChildren}
          isOpen={open}
          setOpen={setOpen}
          code={code}
          saveSnapshot={saveSnapshot}
          prevCode={prevCode}
          restoreCode={restoreCode}
        />
      </div>
    </div>
  );
};

export default RoomPage;
