import { useEffect, useRef, useState } from "react"

const Calendar = () => {
  const today:Date = new Date();
  const [selectedYear, setYear] = useState<number>(-1);
  const [selectedMonth,setMonth] = useState<number>(-1);
  const [selectedDay, setDay] = useState<number>(-1);

  useEffect(() => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setDay(today.getDate());
  },[])

  return (
    <div>

    </div>
  )
}

export default Calendar