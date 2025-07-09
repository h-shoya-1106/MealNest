import { isToday } from "date-fns";
import { format } from "date-fns";

type Props = {
  day: Date;
  mstTimeZone: { id: number, displayName: string }[];
};

export const DayCell = ({ day, mstTimeZone }: Props) => {
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
        {mstTimeZone.map((tz) => (
          <span key={tz.id}>{tz.displayName}</span>
        ))}
      </div>
    </div>
  );
};