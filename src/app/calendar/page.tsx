"use client";

import { useEffect, useState } from "react";
import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { CalendarHeader } from "../../../features/calendar/components/Header/CalendarHeader";
import { MonthView } from "../../../features/calendar/components/Month/MonthView";
import { WeekView } from "../../../features/calendar/components/Week/WeekView";
import { Menu, MstTimeZone } from "@prisma/client";


export default function CalendarPage() {
  // const [mstTimeZone, setMstTimeZone] = useState<MstTimeZone[]>([]);
  const [menuMonthList, setMenuMonth] = useState<Menu[]>([]);
  const [menuWeeklyList, setMenuWeekly] = useState<Menu[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeekly, setCurrentWeekly] = useState(new Date());

  // ページ読み込み時は現在の日付を取得してapiに渡す
  // 月切り替え時はその日時を取得してapiに渡す
  useEffect(() => {
    const dateStr = currentMonth.toISOString().slice(0, 7);

    const userId = 1; // test用
    const fetchMenu = async () => {
      const res = await fetch(`/api/menu/byMonth?userId=${userId}&&date=${dateStr}`);
      const data = await res.json();
      setMenuMonth(data);
    };

    fetchMenu();
  }, [currentMonth]);

  useEffect(() => {
    const dateStr = currentWeekly.toISOString().slice(0, 10);

    const userId = 1; // test用
    const fetchMenu = async () => {
      const res = await fetch(`/api/menu/byWeekly?userId=${userId}&date=${dateStr}`);
      const data = await res.json();
      setMenuWeekly(data);
    };

    fetchMenu();
  }, [currentWeekly]);

  // タイムゾーンの取得
  // useEffect(() => {
  //   const fetchMstTimeZone = async () => {
  //     const res = await fetch('/api/mstData/mstTimeZone');
  //     const data = await res.json();
  //     setMstTimeZone(data);
  //   };
  //   fetchMstTimeZone();
  // }, []);

  const handleDelete = (day: string) => {
    console.log(`Delete ${day}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CalendarHeader
        currentMonth={viewMode === "month" ? currentMonth : currentWeekly}
        viewMode={viewMode}
        onPrev={() => {
          if (viewMode === "month") {
            setCurrentMonth(subMonths(currentMonth, 1));
          } else {
            setCurrentWeekly((prev) => subDays(prev, 7)); // ← 週を1つ前に
          }
        }}
        onNext={() => {
          if (viewMode === "month") {
            setCurrentMonth(addMonths(currentMonth, 1));
          } else {
            setCurrentWeekly((prev) => addDays(prev, 7)); // ← 週を1つ後に
          }
        }}
        onChangeView={setViewMode}
      />

      {viewMode === "month" ? (
        <MonthView currentMonth={currentMonth} menuList={menuMonthList} />
      ) : (
        <WeekView currentWeek={currentWeekly} menuList={menuWeeklyList} onDelete={handleDelete} />
      )}
    </div>
  );
}
