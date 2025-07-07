import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";
import { DayCell } from "../Day/DayCell";
import { format } from "date-fns";
import { Meal } from '../../types/index';


type Props = {
  currentMonth: Date;
  data: Record<string, Meal>;
};

export const MonthView = ({ currentMonth, data }: Props) => {
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  const prefixBlanks = Array(getDay(startOfMonth(currentMonth))).fill(null);

  return (
    <>
      <div className="grid grid-cols-7 text-center text-xs text-gray-600 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-2 gap-y-6 text-center text-sm">
        {prefixBlanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map((day) => (
          <DayCell key={day.toISOString()} day={day} meal={data[format(day, "yyyy-MM-dd")]} />
        ))}
      </div>
    </>
  );
};