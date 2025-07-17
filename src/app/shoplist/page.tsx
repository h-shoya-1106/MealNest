"use client";

import React, { useEffect, useState } from "react";
import { ShoppingHeader } from "../../../features/ShopList/Header/ShoppingHeader";
import { ProgressBar } from "../../../features/ShopList/Header/ProgressBar";
import { MenuAccordion } from "../../../features/ShopList/MenuAccordion/MenuAccordion";
import { ShoppingList } from "../../../features/ShopList/ShopList";

export default function ShopPage() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [materials, setMaterials] = useState<any[]>([]);
  const [menuData, setMenuData] = useState<any>({});

  useEffect(() => {
    const today = new Date();
    const todayStr = dateToString(today);
    setSelectedDates([todayStr]);
  }, []);

  useEffect(() => {
    if (selectedDates.length === 0) return;

    const fetchData = async () => {
        try {
            const query = selectedDates.join(",");
            const res = await fetch(`/api/shoplist?dates=${query}`);
            const data = await res.json();
            setMaterials(data.materials);
            setMenuData(data.menuData);
    } catch (error) {
        console.error("データ取得に失敗しました:", error);
    }
  };

    fetchData();
    }, [selectedDates]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const dateToString = (date: Date) => date.toISOString().split("T")[0];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date.getDate(),
        dateString: dateToString(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = dateToString(date);
      days.push({
        date: i,
        dateString,
        isCurrentMonth: true,
        isToday: dateString === dateToString(today),
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date: i,
        dateString: dateToString(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateToggle = (dateString: string) => {
    setSelectedDates((prev) =>
      prev.includes(dateString) ? prev.filter((d) => d !== dateString) : [...prev, dateString]
    );
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCheckedCount = () => Object.values(checkedItems).filter(Boolean).length;
  const getTotalItems = () => materials.length;
  const getProgressPercentage = () => {
    const total = getTotalItems();
    const checked = getCheckedCount();
    return total > 0 ? (checked / total) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative pb-24">
      <div className="max-w-4xl mx-auto">
        <ShoppingHeader
          selectedDates={selectedDates}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          weekDays={["日", "月", "火", "水", "木", "金", "土"]}
          generateCalendarDays={generateCalendarDays}
          handleDateToggle={handleDateToggle}
          menuData={menuData}
        />
        <MenuAccordion
          isAccordionOpen={isAccordionOpen}
          setIsAccordionOpen={setIsAccordionOpen}
          selectedDates={selectedDates}
          menuData={menuData}
          formatDate={formatDate}
        />
        <ShoppingList
          materials={materials}
          toggleCheck={toggleCheck}
        />
      </div>

      {/* プログレスバー固定 */}
      <div className="fixed bottom-16 left-0 w-full max-w-4xl mx-auto px-4 bg-white rounded-md shadow-md">
        <ProgressBar
          getCheckedCount={getCheckedCount}
          getTotalItems={getTotalItems}
          getProgressPercentage={getProgressPercentage}
        />
      </div>
    </div>
  );
}