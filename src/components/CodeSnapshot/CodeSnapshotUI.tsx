import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Calendar from '../Calendar/Calendar'
import { CodeSnapshot } from '../../model/CodeSnapshot'
import SnapshotList from './SnapshotList';
import { Map } from 'immutable';

const CodeSnapshotUI = ({year, month, snapshots, setIsReceived, setCode, setSnapshots, roomId, dailySnapshots, setDailySnapshots, savePrevCode}:{year:number, month:number, snapshots:Map<string, Map<string, Map<string, any>>>, setIsReceived:Dispatch<SetStateAction<boolean>>, setCode:Dispatch<SetStateAction<string>>, setSnapshots:Dispatch<SetStateAction<Map<string, Map<string, Map<string, any>>>>>, roomId:string|undefined, dailySnapshots:CodeSnapshot[], setDailySnapshots:Dispatch<SetStateAction<CodeSnapshot[]>>, savePrevCode:() => void} ) => {
  

  const [selectedYear, setYear] = useState<number>(year);
  const [selectedMonth, setMonth] = useState<number>(month);
  const [selectedDay, setDay] = useState<number>(-1);
  // 선택된 날짜에 존재하는 코드 스냅샷들
  
  // 자기 화면에 표시되는 코드만 업데이트
  const updateOwnCode = (code:string):void => {
    savePrevCode();
    setIsReceived(true);
    setCode(code);
    setTimeout(() => {
      setIsReceived(false)
    },200);
  }

  useEffect(() => {
    
  },[snapshots])

  return (
    <div>
      <Calendar snapshots={snapshots} setSnapshots={setSnapshots} roomId={roomId} dailySnapshots={dailySnapshots} setDailySnapshots={setDailySnapshots} selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay} setYear={setYear} setMonth={setMonth} setDay={setDay} />
      <SnapshotList dailySnapshots={dailySnapshots} updateOwnCode={updateOwnCode}/>
    </div>
  )
}

export default CodeSnapshotUI;