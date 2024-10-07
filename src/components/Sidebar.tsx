import { Dispatch, SetStateAction } from "react";
import { RoomInfo } from "../model/RoomInfo";

const Sidebar = ({ rooms, goToRoom, setModal, isDropdownOpen, setDropdown, logout, username }: { rooms: RoomInfo[], goToRoom: (roomUid: string) => void, setModal: Dispatch<SetStateAction<boolean>>, isDropdownOpen:boolean, setDropdown: Dispatch<SetStateAction<boolean>>, logout:() => void, username:string }) => {
 

  return (
    <div className="bg-[#282C34] text-white h-screen min-w-56 w-2/12 border-solid border-r-2 border-gray-500 ">
      <div className="h-32 flex flex-col border-solid border-b-2 border-gray-500">
        <div className="flex justify-between h-16 p-4">
          <div className="flex h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown(!isDropdownOpen);
            }
          }
          >
            <div className="h-full w-8 bg-pink-300 rounded-full"></div>
            <div className="leading-8 align-middle pl-2 select-none">
              {username.length >= 8 ? username.substring(0,8  )+"..." : username }
            </div>
            {isDropdownOpen ? (
              <div className="absolute bg-white/25 backdrop-blur-sm shadow-lg rounded-xl top-14 z-20 w-32">
                <ul className="text-left">
                  <li
                    className="px-4 py-2 hover:bg-white/50 cursor-pointer select-none rounded-xl"
                    onClick={() => {
                      logout();
                      setDropdown(false);
                    }}
                  >
                    로그아웃
                  </li>
                </ul>
              </div>
            )
          : <></>
          }
          </div>
          <div className="flex h-full items-center">
            <span className="material-icons">notifications</span>
          </div>
        </div>
        <div className="p-4 w-full">
          <div className="flex items-center relative bg-[#3A414E] rounded-md">
            <span className="material-icons absolute">search</span>
            <input className="bg-transparent leading-8 pl-8 w-full text-white placeholder:text-white placeholder:text-opacity-50 outline-none" placeholder="방 이름으로 검색"></input>
          </div>
        </div>
      </div>
      <div className="text-white text-xl font-bold p-4">클래스룸</div>
      <ul className="max-w-screen-md pl-2 pr-2">
        {rooms?.map((room: RoomInfo) => (
          <div key={room.getId()} className="mb-2">
            <div
              className="w-full text-left p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => { goToRoom(room.getUuid()) }}
            >
              {room.getName()}
            </div>
          </div>
        ))}
      </ul>
      <div
        className="pl-2 pr-2 hover:bg-gray-700 rounded cursor-pointer align-middle"
        onClick={() => { setModal(true) }}
      >
        <span className="material-icons w-8 h-8 align-bottom">add</span>
        <span className="leading-10">새로운 방 추가</span>
      </div>
    </div>
  );
};

export default Sidebar;