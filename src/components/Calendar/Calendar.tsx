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
        <div
          aria-hidden
          className="calendar-header-arrow-left"
          onClick={() => functions.onClickArrow("left")}
        />

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
        {state.mode === "years" && (
          <div>
            {state.selectedYearInterval[0]} -{" "}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className="calendar-header-arrow-right"
          onClick={() => functions.onClickArrow("right")}
        />
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
                const isSelectedDay = cheackDateEqual(
                  day.date,
                  state.selectedDate.date
                ); //выбран ли день сейчас
                const isAddionalDay =
                  day.monthIndex !== state.selectedMonth.monthIndex; //отображение дней из предыдущего или следующего месяца в текущем мес.
                return (
                  <div
                    aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                    }}
                    className={[
                      "calendar-day",
                      isToday ? "calendar-today-item" : "",
                      isSelectedDay ? "calendar-selected-item" : "",
                      isAddionalDay ? "calendar-additional-day" : "",
                    ].join(" ")}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {state.mode === "monthes" && (
          <div className="calendar-pick-item-container">
            {state.monthesNames.map((monthesNames) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesNames.monthIndex &&
                new Date().getFullYear() === state.selectedYear;

              const isSelectedMonth =
                monthesNames.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesNames.monthIndex);
                    functions.setMode("days");
                  }}
                  className={[
                    "calendar-pick-item",
                    isCurrentMonth ? "calendar-today-item" : "",
                    isSelectedMonth ? "calendar-selected-item" : "",
                  ].join(" ")}
                >
                  {monthesNames.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === "years" && (
          <div className="calendar-pick-item-container">
            <div className="calendar-unchoosable-year ">
              {state.selectedYearInterval[0] - 1}
            </div>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode("monthes");
                  }}
                  className={[
                    "calendar-pick-item",
                    isCurrentYear ? "calendar-today-item" : "",
                    isSelectedYear ? "calendar-selected-item" : "",
                  ].join(" ")}
                >
                  {year}
                </div>
              );
            })}
            <div className="calendar-unchoosable-year ">
              {state.selectedYearInterval[
                state.selectedYearInterval.length - 1
              ] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
