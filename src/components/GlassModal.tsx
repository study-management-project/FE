import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import axi from '../utils/axios/Axios';

export const GlassModal = ({modalOpen, setModal, getRooms} : {modalOpen:boolean, setModal:Dispatch<SetStateAction<boolean>>, getRooms:() =>Promise<void>}) => {
    const [roomName, setRoomName] = useState<string>("");
    const [roomDesc, setRoomDesc] = useState<string>("");

    const postRoom = async() => {
        await axi.post("room", {name: roomName, description: roomDesc});
        setModal(false);
        await getRooms();
    }

  return (
    <>
      <Dialog open={modalOpen} onClose={() => setModal(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white bg-opacity-25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white rounded-lg p-12">
            <DialogTitle className="font-bold text-2xl mb-8">방 추가하기</DialogTitle>
            <div className='flex flex-col gap-8'>
                <input className='bg-white bg-opacity-15 w-96 placeholder:text-white placeholder:text-opacity-75 leading-8 rounded-md p-2' maxLength={50} placeholder='이름을 입력해주세요'
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setRoomName(e.currentTarget.value)}}
                ></input>
                <input className='bg-white bg-opacity-15 w-96 placeholder:text-white placeholder:text-opacity-75 leading-8 rounded-md p-2' maxLength={255} placeholder='방에 대한 설명을 입력해주세요'
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setRoomDesc(e.currentTarget.value)}}
                ></input>
            </div>
            <div className="flex justify-end gap-4">
              <button
              className='h-10 leading-8 px-3 py-1 bg-[#17A1FA] bg-opacity-75 align-middle font-bold rounded-md' 
              onClick={() => {postRoom()}
              }>방 추가</button>
              <button onClick={() => setModal(false)}>취소</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}