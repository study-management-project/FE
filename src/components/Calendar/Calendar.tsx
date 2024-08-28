

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
        <div className="max-w-sm mx-auto p-4 bg-gray-500 text-white text-opacity-50 rounded-lg">
            <div className="flex justify-center text-lg mb-2">
                <div className="bg-black w-14 h-8 rounded-lg text-center">
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
                            className={`h-16 flex pt-1 justify-center ${day === date ? 'bg-slate-900 text-white' : 'bg-transparent'} ${day ? (idx % 7 === 0 ? 'text-red-500 text-opacity-75' : idx % 7 === 6 ? 'text-blue-500 text-opacity-75' : '') : ''}`}
                        >
                            {day ? day : ''}
                        </div>
                        {(idx + 1) % 7 === 0 && (
                            <div className="col-span-7 h-px bg-white opacity-20"></div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
