"use client";

import { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarHeader } from "../../../features/calendar/components/Header/CalendarHeader";
import { MonthView } from "../../../features/calendar/components/Month/MonthView";
import { WeekView } from "../../../features/calendar/components/Week/WeekView";
import { Meal } from '../../../features/calendar/types/index';
import { Menu } from "@prisma/client";


export default function CalendarPage() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ページ読み込み時は現在の日付を取得してapiに渡す
  // 月切り替え時はその日時を取得してapiに渡す
  useEffect(() => {
    const dateStr = currentMonth.toISOString().split("T")[0];

    const userId = 1; // test用
    const fetchMenu = async () => {
      const res = await fetch(`/api/menu/byMonth?userId=${userId}&&date=${dateStr}`);
      const data = await res.json();
      setMenu(data);
    };

    fetchMenu();
  }, [currentMonth]);

  // console.log(menu);
  menu.forEach(menu => {
  console.log(menu);
});

  // 仮データ
  const sampleWeeklyMenus: Record<string, Meal> = {
    // Sunday: { morning: "Natto rice", lunch: "Curry", dinner: "Hot pot" },
    // Monday: { morning: "Toast", lunch: "Ramen" },
    // Tuesday: {},
  };

  const sampleMonthlyData: Record<string, Meal> = {
    // "2025-07-04": { morning: "Natto", lunch: "Curry", dinner: "Sushi" },
    // "2025-07-07": { lunch: "Ramen" },
    // "2025-07-12": { morning: "Toast", dinner: "Tempura" },
  };

  const handleDelete = (day: string) => {
    console.log(`Delete ${day}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        viewMode={viewMode}
        onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
        onChangeView={setViewMode}
      />

      {viewMode === "month" ? (
        <MonthView currentMonth={currentMonth} menu={menu} />
      ) : (
        <WeekView data={sampleWeeklyMenus} onDelete={handleDelete} />
      )}
    </div>
  );
}
