import React from "react";
import { useCalendar } from "../hooks/useCalendar";
import "./Calendar.css";
import { cheackDateEqual, cheackToday } from "../../utils/helpers/date";

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectDate,
  selectedDate,
  locale = "default",
  firstWeekDay = 2,
}) => {
  const { state, functions } = useCalendar({
    locale,
    selectedDate,
    firstWeekDay,
  });

  console.log("state", state);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div aria-hidden className="calendar-header-arrow-left" />
        {state.mode === "days" && (
          <div aria-hidden onClick={() => functions.setMode("monthes")}>
            {state.monthesNames[state.selectedMonth.monthIndex].month}{" "}
            {state.selectedYear}
          </div>
        )}
        {state.mode === "monthes" && (
          <div aria-hidden onClick={() => functions.setMode("years")}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === "days" && (
          <div>
            {state.selectedYearInterval[0]} -{" "}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div aria-hidden className="calendar-header-arrow-right" />
      </div>

      <div className="calendar-body">
        {state.mode === "days" && (
          <>
            <div className="calendar-week-names">
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className="calendar-days">
              {state.calendarDays.map((day) => {
                const isToday = cheackToday(day.date);
                const isSelectedDay = cheackDateEqual(day.date, state.selectedDate.date); //выбран ли день сейчас
                const isAddionalDay = day.monthIndex !== state.selectedMonth.monthIndex //отображение дней из предыдущего или следующего месяца в текущем мес.
                return (
                  <div
                  aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDay(day)
                      selectDate(day.date)
                    }}
                    className={['calendar-day',
                     isToday ? 'calendar-today-item' : '',
                     isSelectedDay ? 'calendar-selected-item' : '',
                     isAddionalDay ? 'calendar-additional-day' : ''
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
