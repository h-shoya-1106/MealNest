import { isToday } from "date-fns";
import { format } from "date-fns";
import { Menu } from "../../types";

type Props = {
  day: Date;
  menuList: Menu[];
};

export const DayCell = ({ day, menuList }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isToday(day) ? "bg-blue-500 text-white" : "text-black"
        }`}
      >
        {format(day, "d")}
      </button>
      {menuList.length > 0 && (
        <div className="flex gap-[2px] text-xs text-gray-600 h-[6px]">
          {menuList.map((menu) => (
            <span key={menu.id}>{menu.timeZone.displayName}</span>
          ))}
        </div>
      )}
    </div>
  );
};
