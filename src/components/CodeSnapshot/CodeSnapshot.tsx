import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Calendar from '../Calendar/Calendar'
import { CodeSnapshot } from '../../model/CodeSnapshot'
import SnapshotList from './SnapshotList';

const CodeSnapshotUI = ({year, month, snapshots, setIsReceived, setCode, setSnapshots, roomId}:{year:number, month:number, snapshots:Map<number, Map<number, Map<number, any>>>, setIsReceived:Dispatch<SetStateAction<boolean>>, setCode:Dispatch<SetStateAction<string>>, setSnapshots:Dispatch<SetStateAction<Map<number, Map<number, Map<number, any>>>>>, roomId:string|undefined} ) => {
  
  // 선택된 날짜에 존재하는 코드 스냅샷들
  const [dailySanpshots, setDailySnapshots] = useState<CodeSnapshot[]>([]);
  
  // 자기 화면에 표시되는 코드만 업데이트
  const updateOwnCode = (code:string):void => {
    setIsReceived(true);
    setCode(code);
  }

  return (
    <div>
      <Calendar snapshots={snapshots} setSnapshots={setSnapshots} roomId={roomId} dailySnapshots={dailySanpshots} setDailySnapshots={setDailySnapshots}/>
      <SnapshotList dailySnapshots={dailySanpshots} updateOwnCode={updateOwnCode}/>
    </div>
  )
}

export default CodeSnapshotUI;