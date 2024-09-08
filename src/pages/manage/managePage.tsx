import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import axi from "../../utils/axios/Axios";
import { RoomInfo } from "../../model/RoomInfo";
import Sidebar from "../../components/Sidebar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import RoomCard from "../../components/RoomCard";
import { GlassModal } from "../../components/GlassModal";


const ManagePage = () => {
  const navigator:NavigateFunction = useNavigate();
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [modalOpen, setModal] = useState<boolean>(false);
  
  const getRooms = async():Promise<void> => {
    const response:AxiosResponse = await axi.get('rooms');
    setRooms(response.data.map((room:unknown) => RoomInfo.fromListJson(room)));
  }

  const goToRoom = (roomUuid:string):void => {
    navigator(`/room/${roomUuid}`);
  }

  useEffect(() => {
    getRooms();
  },[])

  return (
    <>
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar rooms={rooms} goToRoom = {goToRoom} setModal={setModal} />

        <div className="w-full flex flex-col">
          {/* Header */}
          <div className=" bg-[#282C34] items-center h-16 w-fulljustify-between p-5">
            <h1 className="text-xl font-bold text-white">최근 항목</h1>
          </div>
          {/* Main Content */}
          <div className="flex-1 bg-[#212121] p-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms?.map((room) => (
                <RoomCard room={room} goToRoom={goToRoom} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <GlassModal modalOpen={modalOpen} setModal={setModal} />
    </>
    
  );
}

export default ManagePage;
