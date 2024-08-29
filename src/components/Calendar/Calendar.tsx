

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    return { year, month, date };
};

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ():JSX.Element => {
    const { year, month, date } = getCurrentDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startOffset = firstDayOfMonth.getDay();

    const daysInMonth = lastDayOfMonth.getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const calendarDays = [
        ...Array.from({ length: startOffset }, () => null),
        ...daysArray
    ];

    return (
        <div className="w-80 h-32">
            <div className="mx-auto p-4 bg-transparent text-white text-opacity-50 rounded-lg">
                <div className="flex justify-center items-center text-lg mb-3">
                    <div className="bg-black w-12 h-9 rounded-lg text-center leading-9 text-[1rem] font-bold">
                        {month + 1}월
                    </div>
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
                                className={`h-10 flex justify-center ${day === date ? 'bg-slate-900 text-white' : 'bg-transparent'} ${day ? (idx % 7 === 0 ? 'text-red-500 text-opacity-75' : idx % 7 === 6 ? 'text-blue-500 text-opacity-75' : '') : ''}`}
                            >
                                {day ? day : ''}
                            </div>
                            {(idx + 1) % 7 === 0 && (
                                <div className="col-span-7 h-[0.5px] bg-white opacity-10"></div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
