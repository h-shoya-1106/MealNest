import { startOfWeek, endOfWeek } from "date-fns";

export function getWeekRange(date: Date) {
  return {
    start: startOfWeek(date, { weekStartsOn: 0 }), // 日曜始まり
    end: endOfWeek(date, { weekStartsOn: 0 }),
  };
}