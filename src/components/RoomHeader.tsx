import { Dispatch, SetStateAction, } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom";

const RoomHeader = ({onIconClicked, snapshotTitle, setSnapshotTitle }: {onIconClicked:(e:React.MouseEvent) => void, snapshotTitle:string, setSnapshotTitle:Dispatch<SetStateAction<string>> }) => {
  const navigate:NavigateFunction = useNavigate();

  const updateSnapshotTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSnapshotTitle(e.target.value);
  }

  const goToSignIn = () => {
    navigate("/");
  }


  return (
        <div className='room-header-container bg-black flex h-12 justify-between items-start sticky z-30 top-0 p-0.5'>
          <div className="h-full w-2/3 flex items-center">
            <div className="text-white">
              로고 
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
            <div className="text-white h-full flex justify-center items-center mr-2">
              <span 
                className="material-icons select-none cursor-pointer"
                onClick={goToSignIn}
                >account_box</span>
            </div>
            <div className=''>
              <div onClick={onIconClicked} className="cursor-pointer mr-2" id="이해도 조사">
                <img src="/icons/iconCheckUp.png" alt="Check Up" className="w-[23px] h-[23px]" />
              </div>
            </div>

            <div onClick={onIconClicked} className="cursor-pointer" id="코드 스냅샷">
              <img src="/icons/iconCodeSnapshotHistory.png" alt="Code Snapshot History" className="w-[28px] h-[28px]" />
            </div>
          </div>
        </div>
  );
}

export default RoomHeader