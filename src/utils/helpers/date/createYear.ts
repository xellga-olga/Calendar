import { createDate } from "./createDate";
import { createMonth } from "./createMonth";

interface CreateYearParams {
  locale?: string;
  year?: number;
  monthNumber?: number;
}

export const createYear = (params?: CreateYearParams) => {
  const locale = params?.locale ?? "default";

  const today = createDate();

  const monthCount = 12;

  const year = params?.year ?? today.year;

  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= monthCount - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year,
  };
};
