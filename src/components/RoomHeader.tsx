import { Dispatch, SetStateAction } from "react"

const RoomHeader = ({isOpen, setOpen}:{isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) => {
  return (
    <div className='room-header-container h-12 bg-black flex justify-end'>
      <div onClick={() => {setOpen(!isOpen)}} className="text-white">
        테스트
      </div>
    </div>
  )
}

export default RoomHeader