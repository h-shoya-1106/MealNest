"use client";

import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarHeader } from "../../../features/calendar/components/Header/CalendarHeader";
import { MonthView } from "../../../features/calendar/components/Month/MonthView";
import { WeekView } from "../../../features/calendar/components/Week/WeekView";
import { Meal } from '../../../features/calendar/types/index';


export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        <MonthView currentMonth={currentMonth} data={sampleMonthlyData} />
      ) : (
        <WeekView data={sampleWeeklyMenus} onDelete={handleDelete} />
      )}
    </div>
  );
}
