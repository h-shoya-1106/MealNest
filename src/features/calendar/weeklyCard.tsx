import { Trash2, Pencil } from "lucide-react";
import { Menu } from "../../types";
import { format } from "date-fns";

type Props = {
  day: string; // yyyy-MM-dd
  menuList: Menu[];
  onDelete: (day: string) => void;
};

export const WeeklyCard = ({ day, menuList, onDelete }: Props) => {
  const weekday = format(new Date(day), "EEEE"); // Sunday, Monday などにする

  // 表示名から該当メニューを取得
  const morning = menuList.find((m) => m.timeZone.displayName === "朝");
  const lunch = menuList.find((m) => m.timeZone.displayName === "昼");
  const dinner = menuList.find((m) => m.timeZone.displayName === "夜");

  const hasMeal = morning || lunch || dinner;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        {hasMeal && (
          <>
            <button className="text-blue-500 hover:text-blue-700">
              <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(day)} className="text-red-500 hover:text-red-700">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>

      <h2 className="text-md font-bold mb-2">{weekday}</h2>

      {hasMeal ? (
        <div className="pl-2 space-y-1 text-sm">
          {morning && <p>Morning: {morning.name}</p>}
          {lunch && <p>Lunch: {lunch.name}</p>}
          {dinner && <p>Dinner: {dinner.name}</p>}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic pl-2">メニュー未登録</p>
      )}
    </div>
  );
};
