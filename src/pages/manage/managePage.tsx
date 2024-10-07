import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import axi from "../../utils/axios/Axios";
import { RoomInfo } from "../../model/RoomInfo";
import Sidebar from "../../components/Sidebar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import RoomCard from "../../components/RoomCard";
import { GlassModal } from "../../components/GlassModal";


const ManagePage = () => {
  const navigate:NavigateFunction = useNavigate();
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [isDropdownOpen, setDropdown] = useState<boolean>(false);
  
  const getRooms = async():Promise<void> => {
    const response:AxiosResponse = await axi.get('rooms');
    const newRooms:RoomInfo[] = response.data.map((room:unknown) => RoomInfo.fromListJson(room)).reverse();
    setRooms(newRooms);
  }

  const goToRoom = (roomUuid:string):void => {
    navigate(`/room/${roomUuid}`);
  }

  const logoutImpl = async():Promise<void> => {
    await axi.get('logout');
    navigate('/');
  }

  const logout = ():void => {
    logoutImpl();
  }

  const onPageLoad = async () => {
    const response:AxiosResponse = await axi.get('check');
    if (response.status !== 200) {
      navigate('/');
      return;
    }
    await getRooms();
  }

  useEffect(() => {
    onPageLoad();
  },[])


  return (
    <>
      <div className="flex w-full"
        onClick={() => setDropdown((prev) => prev ? !prev : prev)}
      >
        {/* Sidebar */}
        <Sidebar rooms={rooms} goToRoom = {goToRoom} setModal={setModal} isDropdownOpen={isDropdownOpen} setDropdown={setDropdown} logout={logout}/>

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
      <GlassModal modalOpen={modalOpen} setModal={setModal} getRooms={getRooms}/>
    </>
    
  );
}

export default ManagePage;
