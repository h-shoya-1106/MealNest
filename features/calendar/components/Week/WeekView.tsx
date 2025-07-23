import { startOfWeek, addDays, format } from "date-fns";
import { Menu } from "../../types";
import { MenuCard } from "../Common/MenuCard";
import { MstTimeZone } from "@prisma/client";

type Props = {
  currentWeek: Date;
  menuList: Menu[];
  mstTimeZone: MstTimeZone[];
  onDelete: (menuId: number) => void;
  onEdit: (day: string) => void;
  onCreate: (day: string) => void;
};

export const WeekView = ({ currentWeek, menuList, mstTimeZone, onDelete, onEdit, onCreate }: Props) => {
  // 日曜始まりで週の開始日を取得
  const start = startOfWeek(currentWeek, { weekStartsOn: 0 });

  // その週の7日間の Date を生成（文字列で保持）
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    format(addDays(start, i), "yyyy-MM-dd")
  );

  const groupedByDate: Record<string, Menu[]> = {};

  menuList.forEach((menu) => {
    const dateKey = format(new Date(menu.date), "yyyy-MM-dd");

    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }

    groupedByDate[dateKey].push(menu);
  });

  return (
    <>
      <h1 className="text-lg font-semibold text-center mb-4">Weekly Menu</h1>
      <div className="space-y-4">
      {daysOfWeek.map((day) => (
        <MenuCard
          key={day}
          day={day}
          menuList={groupedByDate[day] || []}
          mstTimeZone={mstTimeZone}
          onDelete={onDelete}
          onEdit={onEdit}
          onCreate={onCreate}
        />
      ))}
      </div>
    </>
  );
};
