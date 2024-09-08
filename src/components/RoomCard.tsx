import { useState } from 'react'
import { RoomInfo } from '../model/RoomInfo';

const RoomCard = ({room, goToRoom}: {room:RoomInfo, goToRoom:(roomUuid:string) => void}) => {
    const [dropdownOpen, setDropdown] = useState<boolean>(false);

  return (
    <div 
        key={room.getId()} 
        className="bg-[#17A1FA] bg-opacity-75 text-white p-4 shadow-md rounded-lg cursor-alias relative select-none"
        onClick={() => {
        goToRoom(room.getUuid())
        }}
        >
        <div 
        className="absolute left-[90%] hover:cursor-pointer"
        onClick={(e:React.MouseEvent) => {
            e.stopPropagation();
            setDropdown((prev:boolean) => !prev);
        }}
        >
            <span className="material-icons">more_vert</span>
        </div>
        {/* Dropdown menu */}
        {dropdownOpen && (
            <div
            className="absolute top-8 right-4 bg-white bg-opacity-80 backdrop:blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-2 rounded-md z-10"
            onClick={(e) => e.stopPropagation()} // Prevent menu from closing when interacting with it
            >
            <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                setDropdown(false); // Close dropdown after clicking
                }}
            >
                방 정보 수정
            </button>
            <button
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                setDropdown(false); // Close dropdown after clicking
                }}
            >
                방 삭제
            </button>
            </div>
        )}

        <h2 className="text-lg font-semibold">{room.getName()}</h2>
        <p className="text-white text-opacity-50">{room.getDescription()}</p>
    </div>
  )
}

export default RoomCard