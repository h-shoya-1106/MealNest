"use client";

import React, { useState } from 'react';
import { Check, ShoppingCart, ChefHat, ChevronDown, Plus, Minus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const ShoppingListApp = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedDates, setSelectedDates] = useState(['2025-07-16']);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6, 1));
  const [accordionOpen, setAccordionOpen] = useState<{ [date: string]: boolean }>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  // 日付フォーマット関数
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 日付文字列を生成
  const dateToString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // カレンダーの日付を生成
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // 前月の日付を埋める
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date.getDate(),
        dateString: dateToString(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // 今月の日付
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

    // 次月の日付を埋める
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

  // 月を変更
  const changeMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  // 日付選択/解除
  const handleDateToggle = (dateString: string) => {
    setSelectedDates((prev) => {
      if (prev.includes(dateString)) {
        return prev.filter((d) => d !== dateString);
      } else {
        return [...prev, dateString];
      }
    });
  };

  // アコーディオンの開閉切替
  const toggleAccordion = (date: string) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  // サンプルデータ - 複数日分の献立
  const menuData = {
    "2025-07-16": {
      breakfast: {
        menuName: "和風朝食セット",
        dishes: ["ご飯", "味噌汁", "焼き魚"],
      },
      lunch: {
        menuName: "チキンカレーセット",
        dishes: ["チキンカレー", "サラダ"],
      },
      dinner: {
        menuName: "鮭の塩焼き定食",
        dishes: ["鮭の塩焼き", "ご飯", "漬物"],
      },
    },
    "2025-07-17": {
      breakfast: {
        menuName: "洋風朝食セット",
        dishes: ["パンケーキ", "スクランブルエッグ"],
      },
      lunch: {
        menuName: "パスタランチ",
        dishes: ["ミートソースパスタ", "サラダ"],
      },
      dinner: {
        menuName: "豚の生姜焼き定食",
        dishes: ["豚の生姜焼き", "ご飯", "味噌汁"],
      },
    },
  };

  // 食材データ - 全カテゴリ合成して1配列にしたもの
  const shoppingListRaw = {
    vegetables: [
      { name: '玉ねぎ', amount: '2個', meals: ['朝食', '昼食'] },
      { name: '人参', amount: '1本', meals: ['昼食', '夕食'] },
      { name: 'じゃがいも', amount: '3個', meals: ['昼食'] },
      { name: '大根', amount: '1/2本', meals: ['夕食'] },
      { name: '小松菜', amount: '1束', meals: ['朝食', '夕食'] },
    ],
    meat: [
      { name: '鶏もも肉', amount: '300g', meals: ['昼食'] },
      { name: '鮭切り身', amount: '2切れ', meals: ['夕食'] },
    ],
    grains: [
      { name: '米', amount: '2合', meals: ['朝食', '昼食', '夕食'] },
      { name: '食パン', amount: '1斤', meals: ['朝食'] },
    ],
    dairy: [
      { name: '卵', amount: '6個', meals: ['朝食', '夕食'] },
      { name: '牛乳', amount: '1L', meals: ['朝食'] },
      { name: 'バター', amount: '200g', meals: ['朝食'] },
    ],
    seasonings: [
      { name: '醤油', amount: '1本', meals: ['朝食', '夕食'] },
      { name: 'カレールー', amount: '1箱', meals: ['昼食'] },
      { name: '塩', amount: '1袋', meals: ['夕食'] },
      { name: 'みりん', amount: '1本', meals: ['夕食'] },
    ],
  };
  // カテゴリを無視して全アイテムを単一リスト化
  const shoppingList = Object.values(shoppingListRaw).flat();

  // チェックトグル
  const handleItemCheck = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 数量調整
  const updateQuantity = (key: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) + change),
    }));
  };

  // 進捗計算
  const getCheckedCount = () => Object.values(checkedItems).filter(Boolean).length;
  const getTotalItems = () => shoppingList.length;
  const getProgressPercentage = () => {
    const total = getTotalItems();
    const checked = getCheckedCount();
    return total > 0 ? (checked / total) * 100 : 0;
  };

  // 曜日と月名
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">買い物リスト</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="relative">
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 rounded-lg px-4 py-2 transition-all duration-200 border border-orange-300"
                    >
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-800 font-medium">
                        {selectedDates.length === 1
                          ? formatDate(selectedDates[0])
                          : `${selectedDates.length}日分選択中`}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-orange-600 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isCalendarOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-20 min-w-80">
                        {/* カレンダーヘッダー */}
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4 text-gray-600" />
                          </button>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}
                          </h3>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        {/* 曜日ヘッダー */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {weekDays.map((day) => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* カレンダー日付 */}
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((day, index) => {
                            const isSelected = selectedDates.includes(day.dateString);
                            const hasMenu = !!menuData[day.dateString];

                            return (
                              <button
                                key={index}
                                onClick={() => day.isCurrentMonth && handleDateToggle(day.dateString)}
                                disabled={!day.isCurrentMonth}
                                className={`
                                  p-2 text-sm rounded-lg transition-all duration-200 relative
                                  ${day.isCurrentMonth ? 'hover:bg-orange-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}
                                  ${isSelected ? 'bg-orange-500 text-white font-semibold' : day.isToday ? 'bg-orange-100 text-orange-800 font-semibold' : 'text-gray-700'}
                                  ${hasMenu && day.isCurrentMonth ? 'border-2 border-orange-300' : ''}
                                `}
                              >
                                {day.date}
                                {hasMenu && day.isCurrentMonth && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* 凡例 */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span>献立設定済み</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-orange-500 rounded"></div>
                              <span>選択中</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 進捗表示 */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-700">買い物進捗</div>
                <div className="text-sm text-gray-500">
                  {getCheckedCount()}/{getTotalItems()} 品目完了
                </div>
              </div>
              <div className="text-sm font-medium text-orange-600">{Math.round(getProgressPercentage())}%</div>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* 献立プレビューをアコーディオン化 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex justify-between items-center mb-4 text-lg font-semibold text-gray-800 bg-orange-50 px-4 py-3 rounded-xl hover:bg-orange-100 focus:outline-none"
            aria-expanded={isAccordionOpen}
          >
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span>選択した日の献立</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                isAccordionOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isAccordionOpen && (
            <div className="space-y-6">
              {selectedDates
                .sort()
                .map((dateString) => {
                  const menuForDate = menuData[dateString];
                  if (!menuForDate) {
                    return (
                      <div key={dateString} className="text-gray-500">
                        {formatDate(dateString)} の献立は未設定です。
                      </div>
                    );
                  }
                  return (
                    <div key={dateString} className="border border-gray-200 rounded-xl p-4 bg-orange-50">
                      <div className="mb-3 font-medium text-orange-700">
                        {formatDate(dateString)}
                      </div>

                      {["breakfast", "lunch", "dinner"].map((timeZone) => {
                        const meal = menuForDate[timeZone];
                        if (!meal) return null;
                        return (
                          <div key={timeZone} className="mb-4">
                            <div className="text-sm font-semibold text-orange-600 mb-1 capitalize">
                              {timeZone === "breakfast"
                                ? "朝食"
                                : timeZone === "lunch"
                                ? "昼食"
                                : "夕食"}
                            </div>
                            <div className="text-base font-semibold text-gray-900 mb-1">
                              {meal.menuName}
                            </div>
                            <ul className="list-disc list-inside text-gray-700">
                              {meal.dishes.map((dish, i) => (
                                <li key={i}>{dish}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* 買い物リスト（カテゴリなし単一リスト） */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">🛒 買い物リスト ({shoppingList.length}品目)</h3>
          </div>
          <div className="p-4">
            {shoppingList.map((item, index) => {
              const key = `item-${index}`;
              const isChecked = checkedItems[key];
              const quantity = quantities[key] || 1;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl mb-3 transition-all duration-200 ${
                    isChecked ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleItemCheck(key)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {isChecked && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <div className={`transition-all duration-200 ${isChecked ? 'opacity-60' : ''}`}>
                      <div className={`font-medium text-gray-800 ${isChecked ? 'line-through' : ''}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.amount} • {item.meals.join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(key, -1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-3 w-3 text-gray-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(key, 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListApp;
