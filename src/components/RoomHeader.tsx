import { Dispatch, SetStateAction } from "react"

const RoomHeader = ({isOpen, setOpen}:{isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) => {
  return (
    <div className='room-header-container h-12 bg-black flex justify-end sticky top-0 z-10'>
      <div onClick={() => {setOpen(!isOpen)}} className="text-white">Header 내부의 버튼</div>
    </div>
  )
}

export default RoomHeader