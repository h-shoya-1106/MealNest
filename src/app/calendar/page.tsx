"use client";

import { useEffect, useState } from "react";
import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { CalendarHeader } from "../../../features/calendar/components/Header/CalendarHeader";
import { MonthView } from "../../../features/calendar/components/Month/MonthView";
import { WeekView } from "../../../features/calendar/components/Week/WeekView";
import { Menu, MstTimeZone } from "@prisma/client";
import { isSameDay, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { MenuCard } from "../../../features/calendar/components/Common/MenuCard";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const [mstTimeZone, setMstTimeZone] = useState<MstTimeZone[]>([]);
  const [menuMonthList, setMenuMonth] = useState<Menu[]>([]);
  const [menuWeeklyList, setMenuWeekly] = useState<Menu[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeekly, setCurrentWeekly] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      const dateStr = currentMonth.toISOString().slice(0, 7);
      const userId = 1; // test用
      const res = await fetch(`/api/menu/byMonth?userId=${userId}&&date=${dateStr}`);
      const data = await res.json();
      setMenuMonth(data);
    };
    fetchMenu();
  }, [currentMonth]);

  useEffect(() => {
    const fetchMenu = async () => {
      const dateStr = currentWeekly.toISOString().slice(0, 10);
      const userId = 1; // test用
      const res = await fetch(`/api/menu/byWeekly?userId=${userId}&date=${dateStr}`);
      const data = await res.json();
      setMenuWeekly(data);
    };
    fetchMenu();
  }, [currentWeekly]);

  useEffect(() => {
    const fetchMstTimeZone = async () => {
      const res = await fetch('/api/mstData/mstTimeZone');
      const data = await res.json();
      setMstTimeZone(data);
    };
    fetchMstTimeZone();
  }, []);

  // 週表示になったらスライドを消す
  useEffect(() => {
    if (viewMode === "week") {
      setSelectedDate(null);
    }
  }, [viewMode]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEdit = (day: string) => {
    router.push(`/calendar/menu/${day}/edit`)
  };

  const handleDelete = (day: string) => {
    console.log(`Delete ${day}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <CalendarHeader
        currentMonth={viewMode === "month" ? currentMonth : currentWeekly}
        viewMode={viewMode}
        onPrev={() => {
          if (viewMode === "month") setCurrentMonth(subMonths(currentMonth, 1));
          else setCurrentWeekly((prev) => subDays(prev, 7));
        }}
        onNext={() => {
          if (viewMode === "month") setCurrentMonth(addMonths(currentMonth, 1));
          else setCurrentWeekly((prev) => addDays(prev, 7));
        }}
        onChangeView={setViewMode}
      />

      {viewMode === "month" ? (
        <MonthView
          currentMonth={currentMonth}
          menuList={menuMonthList}
          onSelectDate={handleDateClick}
        />
      ) : (
        <WeekView
          currentWeek={currentWeekly}
          menuList={menuWeeklyList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <AnimatePresence>
        {selectedDate && viewMode === "month" && (
          <motion.div
            key="slide-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <MenuCard
              day={format(selectedDate, "yyyy-MM-dd")}
              menuList={menuMonthList.filter((menu) =>
                isSameDay(new Date(menu.date), selectedDate)
              )}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isMonthView
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
