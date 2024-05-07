import React from "react";
import { useCalendar } from "../hooks/useCalendar";

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
  return <div>Calendar</div>;
};
