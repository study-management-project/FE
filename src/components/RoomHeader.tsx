import { Dispatch, SetStateAction, useEffect, useRef, } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom";
import axi from "../utils/axios/Axios";
import { AxiosResponse } from "axios";

const RoomHeader = ({ isLogin, onIconClicked, snapshotTitle, setSnapshotTitle }: { isLogin: React.MutableRefObject<boolean>, onIconClicked: (e: React.MouseEvent) => void, snapshotTitle: string, setSnapshotTitle: Dispatch<SetStateAction<string>> }) => {
  const navigate: NavigateFunction = useNavigate();



  const logo = (): string => {
    const srcList: string[] =
      [
        "Smilies/Thinking%20Face.png",
        "Smilies/Saluting%20Face.png",
        "Smilies/Nerd%20Face.png",
        "Smilies/Face%20with%20Raised%20Eyebrow.png",
        "Smilies/Face%20with%20Peeking%20Eye.png",
        "Smilies/Grimacing%20Face.png"
      ]
    const index: number = Math.floor(Math.random() * srcList.length);
    return srcList[index];
  }

  const updateSnapshotTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnapshotTitle(e.target.value);
  }

  const goToSignIn = () => {
    if (isLogin.current === true) {
      navigate("/manage/");
    } else {
      navigate("/");
    }
  }

  return (
    <div className='room-header-container bg-black flex h-12 justify-between items-start sticky z-30 top-0 p-0.5'>
      <div className="h-full w-2/3 flex items-center">
        <div className="text-white">
          <img src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/${logo()}`} alt="..." width="25" height="25" />
        </div>
        <div className="p-2 w-6/12">
          <input
            className="leading-8 bg-transparent text-xl text-white w-2/3"
            value={snapshotTitle}
            onChange={updateSnapshotTitle}
          >
          </input>
        </div>
      </div>
      <div className="h-full flex items-center mr-5">
        <div className="text-white h-full flex items-center mr-2">
          <span
            className="material-icons select-none cursor-pointer"
            onClick={goToSignIn}
          >account_box</span>
        </div>

        <div onClick={onIconClicked} className="flex cursor-pointer mr-2 h-full items-center" id="Q&A">
          <span className="material-icons text-white select-none">question_answer</span>
        </div>

        <div onClick={onIconClicked} className="flex cursor-pointer h-full items-center" id="코드 스냅샷">
          <span className="material-icons text-white select-none">work_history</span>
        </div>
      </div>
    </div>
  );
}

export default RoomHeader;