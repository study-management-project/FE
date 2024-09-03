import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axi from "../../utils/axios/Axios";
import { CodeSnapshot } from "../../model/CodeSnapshot";
import { Map } from "immutable";

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
    return { year, month, date };
};

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({snapshots, setSnapshots, roomId, setDailySnapshots, selectedYear, selectedMonth, selectedDay, setYear, setMonth, setDay }:{snapshots:Map<string, Map<string, Map<string, any>>>, setSnapshots:Dispatch<SetStateAction<Map<string, Map<string, Map<string, any>>>>>, roomId:string|undefined, dailySnapshots:CodeSnapshot[], setDailySnapshots:Dispatch<SetStateAction<CodeSnapshot[]>>, selectedYear:number, selectedMonth:number, selectedDay:number, setYear:Dispatch<SetStateAction<number>>, setMonth:Dispatch<SetStateAction<number>>, setDay:Dispatch<SetStateAction<number>> }):JSX.Element => {
    const { year, month, date } = getCurrentDate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [calendarDays, setCalendarDays] = useState<(number | null)[]>([]);

    // 선택된 년월에 코드 스냅샷이 존재하는 날짜들
    const [monthlySnapshots, setMonthlySnapshots] = useState<number[]>([]);

    // 달력 업데이트
    const updateCalendar = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month-1, 1);
        const lastDayOfMonth = new Date(year, month-1, 0);

        const startOffset = firstDayOfMonth.getDay();
        const daysInMonth = lastDayOfMonth.getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const updatedCalendarDays = [
            ...Array.from({ length: startOffset }, () => null),
            ...daysArray,
        ];

        setCalendarDays(updatedCalendarDays); // 캘린더 업데이트
    };

    // 선택된 월에 대해 스냅샷이 존재하는 날짜 리스트 요청하고 업데이트
    const getMonthlySnapshots = async(year:number, month:number):Promise<void> => {
        const response:AxiosResponse = await axi.get(`room/${roomId}/snapshot/${year}/${month}`);
        setMonthlySnapshots(response.data);
    }

    // 월에 스냅샷이 존재하는 날짜 리스트가 바뀌었을 때 스냅샷 Map 업데이트
    useEffect(() => {
        if (monthlySnapshots.length === 0 ) {
            return;
        } else {
            setSnapshots((prevData) => {
                const nextState = Map(prevData);
                for (let day of monthlySnapshots) {
                    nextState.setIn([selectedDay.toString(), selectedMonth.toString(), day.toString()], []);
                }
                return nextState;
            })
        }
    },[monthlySnapshots])

    // 년월 변경 드롭메뉴    
    const toggleDropdown = ():void => {
        setIsDropdownOpen((prev) => !prev);
    };
    
    // 년도 변경
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        setYear(parseInt(e.target.value, 10));
    };

    // 월 변경
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        setMonth(parseInt(e.target.value, 10));
    };

    // 드롭다운 메뉴가 바로 닫히는 걸 방지하기 위해 이벤트 버블링 방지
    const handleDropdownClick = (e: React.MouseEvent):void => {
        e.stopPropagation(); // 이벤트 버블링을 막아 부모의 클릭 이벤트가 실행되지 않도록 함
    };

    // 일 변경
    const handleDayChange = (e: React.MouseEvent):void => {
        const day:number = parseInt(e.currentTarget.getAttribute('title') as string, 10);
        setDay(day);
    };

    // 해당 날짜의 스냅샷들을 모두 가져오기
    const getDailySnapshots = async(year:number, month:number, day: number):Promise<void> => {
        if (selectedDay === -1) {
            return
        }
        const response = await axi.get(`room/${roomId}/snapshot/${year}/${month}/${day}`);
        const snapshotsList:CodeSnapshot[] = response.data.map((el:any) => (CodeSnapshot.fromJson(el)));
        setDailySnapshots(snapshotsList);
    }

    useEffect(() => {
        getDailySnapshots(selectedYear, selectedMonth, selectedDay);
    },[selectedDay])
    

    // 년도와 월이 바뀌면 캘린더를 새로 그리고 해당 월에 스냅샷이 있는 날짜를 가져온다.
    useEffect(() => {
        updateCalendar(selectedYear, selectedMonth);
        getMonthlySnapshots(selectedYear, selectedMonth);
        setDay(-1);
        setDailySnapshots([]);
    },[selectedYear, selectedMonth])

    return (
        <div className="w-[20vw]">
            <div className="mx-auto p-4 bg-transparent text-white text-opacity-50 rounded-lg">
                <div className="flex relative justify-center items-center text-lg mb-3">
                    <div className="flex flex-col">
                        <div className="bg-black opacity-75 w-12 h-10 rounded-lg text-center leading-4 text-[1rem] font-bold hover:cursor-pointer"
                        onClick={toggleDropdown}
                        >
                            <div className="text-sm w-full text-center">{selectedYear}</div>
                            <div>{selectedMonth}월</div>
                        </div>
                    </div>
                    {isDropdownOpen && (
                    <div className="absolute top-full mt-2 p-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg z-10"
                    onClick={handleDropdownClick}
                    >
                        <div className="flex space-x-2">
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="bg-black bg-opacity-50 text-white p-2 rounded"
                            >
                                {Array.from(
                                    { length: 21 },
                                    (_, i) => year - 20 + i
                                ).map((yearOption) => (
                                    <option key={yearOption} value={yearOption}>
                                        {yearOption}년
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className="bg-black bg-opacity-50 text-white p-2 rounded"
                            >
                                {Array.from({ length: 12 }, (_, i) => i).map(
                                    (monthOption) => (
                                        <option
                                            key={monthOption}
                                            value={monthOption}
                                        >
                                            {monthOption}월
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                )}
                </div>
                <div className="grid grid-cols-7 text-center gap-1">
                    {daysOfWeek.map((day, idx) => (
                        <div key={idx} className={`font-bold ${day === '토' ? 'text-blue-500 text-opacity-75' : day === '일' ?  'text-red-500 text-opacity-75' : ''}`}>
                            {day}
                        </div>
                    ))}
                    {calendarDays.map((day, idx) => (
                        <>
                            <div
                                key={idx}
                                title={day?.toString()}
                                className={`h-10 flex-col justify-center rounded-md 
                                    ${selectedYear === year && selectedMonth === month && day === date ? 'bg-slate-900 opacity-75 text-white' : selectedYear === year && selectedMonth === month && selectedDay==day ? 'bg-green-400 bg-opacity-75 text-white' : 'bg-transparent'} ${day ? (idx % 7 === 0 ? 'text-red-500 text-opacity-75' : idx % 7 === 6 ? 'text-blue-500 text-opacity-75' : '') : ''} ${day && monthlySnapshots.includes(day) ? 'hover:cursor-pointer hover:bg-white hover:bg-opacity-10' : '' }`}
                                onClick={day && monthlySnapshots.includes(day) ? handleDayChange : undefined}
                            >
                                <div>{day ? day : ''}</div>
                                {
                                    snapshots && day && monthlySnapshots.includes(day)
                                    ? <div className={'leading-4 font-bold'}>·</div>
                                    : <div className={'leading-4'}> </div>
                                }
                            </div>
                            {(idx + 1) % 7 === 0 && (
                                <div className="col-span-7 h-[1px] bg-white opacity-10"></div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
