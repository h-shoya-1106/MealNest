import { eachDayOfInterval, endOfMonth, getDay, isSameDay, startOfMonth } from "date-fns";
import { DayCell } from "../Day/DayCell";
import { Menu } from "../../types";


type Props = {
  currentMonth: Date;
  menuList: Menu[];
  onSelectDate: (date: Date) => void;
};

export const MonthView = ({ currentMonth, menuList, onSelectDate }: Props) => {
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
        {days.map((day) => {
          const dayMenus = menuList.filter((menu) =>
            isSameDay(new Date(menu.date), day)
          );

          return (
            <DayCell
              key={day.toDateString()}
              day={day}
              menuList={dayMenus}
              onClick={() => onSelectDate(day)}
            />
          );
        })}
      </div>
    </>
  );
};
