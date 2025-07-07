import { isToday } from "date-fns";
import { format } from "date-fns";

type Props = {
  day: Date;
  meal: {
    morning : Array<string>
    lunch : Array<string>
    dinner : Array<string>
  };
};

export const DayCell = ({ day, meal }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isToday(day) ? "bg-blue-500 text-white" : "text-black"
        }`}
      >
        {format(day, "d")}
      </button>
      <div className="flex gap-[2px] text-xs text-gray-600 h-[6px]">
        {meal?.morning && <span>朝</span>}
        {meal?.lunch && <span>昼</span>}
        {meal?.dinner && <span>夜</span>}
      </div>
    </div>
  );
};