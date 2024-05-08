import React from "react";
import { useCalendar } from "../hooks/useCalendar";
import './Calendar.css'

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({ 
    selectDate, 
    selectedDate, 
    locale = 'default',
    firstWeekDay = 2,
  }) => {
  const { state } = useCalendar({ locale, selectedDate, firstWeekDay })

  console.log('state', state)


  return <div className="calendar">
    <div className="calendar-header">
      <div aria-hidden className="calendar-header-arrow-left" />
      1122333
      <div aria-hidden className="calendar-header-arrow-right" />
    </div>
  </div>;
};
