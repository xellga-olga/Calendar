import { useMemo, useState } from "react";

import {
  createDate,
  createMonth,
  getMonthNumberOfDays,
  getMonthesNames,
} from "../../utils/helpers/date";

import { getWeekDaysNames } from "../../utils/helpers/date/getWeekDaysNames";


interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDay: number;
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year/10) * 10
  return [...Array(10)].map((_, index) => startYear + index)
}

export const useCalendar = ({
  firstWeekDay = 2,
  locale = "default",
  selectedDate: date,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<"days" | "monthes" | "years">("days");

  const [selectedDate, setSelectedDay] = useState(createDate({ date }));
  const [selectedYearInterval, setSelectedYearInterval] = useState(getYearsInterval(selectedDate.year));

  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDate.year, selectedDate.monthIndex),
      locale,
    })
  );

  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const monthesNames = useMemo(() => getMonthesNames(locale), []);
  //console.log("monthesNames", monthesNames);

  const weekDaysNames = useMemo(() => getWeekDaysNames(2, locale), []);
  //console.log('weekDaysNames', weekDaysNames)

  const days = useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  );
  console.log("days", days);

  const calendarDays = useMemo(() => {
    const monthNumbersOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear
    );
    //console.log('monthNumbersOfDays', monthNumbersOfDays)

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumbersOfDays - 1];

    const shiftIndex = firstWeekDay - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;
    //console.log('numberOfPrevDays', numberOfPrevDays)

    const numberOfNextDays =
      7 - lastDay.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDay.dayNumberInWeek + shiftIndex;
    //console.log('numberOfNextDays', numberOfNextDays) 

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays


    const result = []

    for(let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i
      result [i] = prevMonthDays[prevMonthDays.length - inverted] 
    }

    for(let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result [i] = days[i - numberOfPrevDays]
    }

    for(let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays] 
    }

    return result;

  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {

    if(mode === 'years' && direction === 'right') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10))
    }

    if(mode === 'years' && direction === 'left') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10))
    }


    if(mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      
      if(!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
      return setSelectedYear(year);
    }

    if(mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      
      if(!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
      return setSelectedYear(year);
    }

    if(mode === 'days') {
      const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

      if(monthIndex === -1) {
        const year = selectedYear - 1
        setSelectedYear(year)
        if(!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
          return setSelectedMonth(createMonth({date: new Date(year, 11), locale}))
      }

      if(monthIndex === 12) {
        const year = selectedYear + 1
        setSelectedYear(year)
        if(!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
          return setSelectedMonth(createMonth({date: new Date(year, 0), locale}))
      }

      return setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}))
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({date:new Date(selectedYear, monthIndex), locale}));
  };

  return {
    state : {
      mode,
      calendarDays,
      monthesNames,
      weekDaysNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearInterval,
    },

    functions: {
      setMode,
      setSelectedDay,
      onClickArrow, 
      setSelectedMonthByIndex,
      setSelectedYear,
    }
  };
};
