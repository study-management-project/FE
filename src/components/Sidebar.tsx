import { RoomInfo } from "../model/RoomInfo";

const Sidebar = ({rooms, goToRoom} : { rooms:RoomInfo[], goToRoom:(roomUid:string) => void }) => {

  return (
    <div className="bg-[#282C34] text-white h-screen min-w-56 w-2/12 border-solid border-r-2 border-gray-500 ">
        <div className="h-32 flex flex-col border-solid border-b-2 border-gray-500"> 
            <div className="flex justify-between h-16 p-4">
                <div className="flex h-full">
                    <div className="h-full w-8 bg-pink-300 rounded-full"></div>
                    <div className="leading-8 align-middle pl-2">
                        사용자명
                    </div>
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
      <ul>
        {rooms?.map((room:RoomInfo) => (
          <div key={room.getId()} className="mb-2">
            <div 
            className="w-full text-left p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => {goToRoom(room.getUuid())}}
            >
              {room.getName()}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;