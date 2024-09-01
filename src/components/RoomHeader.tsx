import { Dispatch, SetStateAction, } from "react"

const RoomHeader = ({ isOpen, setOpen, onIconClicked }: { isOpen: boolean, setOpen: Dispatch<SetStateAction<boolean>>, onIconClicked:Function }) => {

  return (
    <div className='room-header-container bg-black flex justify-end items-start relative p-0.5'>
      {/* 이해도조사 아이콘 */}
      <div className='top-0 right-0 p-1'>
        <div onClick={onIconClicked} className="cursor-pointer" id="이해도 조사">
          <img src="/icons/iconCheckUp.png" alt="Check Up" className="w-[23px] h-[23px]" />
        </div>
      </div>

      {/* 코드 스냅샷 아이콘 */}
      <div onClick={onIconClicked} className="cursor-pointer" id="코드 스냅샷">
        <img src="/icons/iconCodeSnapshotHistory.png" alt="Code Snapshot History" className="w-[28px] h-[28px]" />
      </div>
    </div>
  );
}

export default RoomHeader