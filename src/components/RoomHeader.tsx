import { Dispatch, SetStateAction, } from "react"

type RoomHeaderProps = {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>;
  onIconClick: (type: 'checkUp' | 'codeSnapshot') => void;
};

const RoomHeader = ({ isOpen, setOpen, onIconClick }: RoomHeaderProps) => {
  const handleCodeSnapshotClick = () => {
    setOpen(!isOpen);
    onIconClick('codeSnapshot');
  };

  const handleCheckUpClick = () => {
    setOpen(!isOpen);
    onIconClick('checkUp');
  };

  return (
    <div className='room-header-container bg-black flex justify-end items-start relative p-0.5'>
      {/* 이해도조사 아이콘 */}
      <div className='top-0 right-0 p-1'>
        <div onClick={handleCheckUpClick} className="cursor-pointer">
          <img src="/icons/iconCheckUp.png" alt="Check Up" className="w-[23px] h-[23px]" />
        </div>
      </div>

      {/* 코드 스냅샷 아이콘 */}
      <div onClick={handleCodeSnapshotClick} className="cursor-pointer">
        <img src="/icons/iconCodeSnapshotHistory.png" alt="Code Snapshot History" className="w-[28px] h-[28px]" />
      </div>
    </div>
  );
}

export default RoomHeader