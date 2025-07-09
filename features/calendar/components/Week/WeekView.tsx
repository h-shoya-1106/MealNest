import { startOfWeek, addDays, format } from "date-fns";
import { Menu } from "../../types";
import { WeeklyCard } from "./weeklyCard";

type Props = {
  currentWeek: Date;
  menuList: Menu[];
  onDelete: (day: string) => void;
};

export const WeekView = ({ currentWeek, menuList, onDelete }: Props) => {
  // 日曜始まりで週の開始日を取得
  const start = startOfWeek(currentWeek, { weekStartsOn: 0 });

  // その週の7日間の Date を生成（文字列で保持）
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    format(addDays(start, i), "yyyy-MM-dd")
  );

  return (
    <>
      <h1 className="text-lg font-semibold text-center mb-4">Weekly Menu</h1>
      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <WeeklyCard key={day} day={day} menuList={menuList[day] || {}} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};
