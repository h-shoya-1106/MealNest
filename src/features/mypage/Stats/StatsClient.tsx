"use client";

import { ListOrdered, Heart, Calendar, Tag, Flame } from "lucide-react";

const repeatDishes = [];

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start gap-2 border border-gray-100">
    <div className="text-gray-500">{icon}</div>
    <div className="text-sm text-gray-600">{label}</div>
    <div className="text-xl font-semibold text-gray-800">{value}</div>
  </div>
);

export default function StatsClient() {
  return (
    <>
      {/* 統計カード */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon={<ListOrdered size={20} />} label="献立数" value="245" />
        <StatCard icon={<Heart size={20} />} label="お気に入り" value="12" />
        <StatCard icon={<Calendar size={20} />} label="献立継続日数" value="8" />
        <StatCard icon={<Tag size={20} />} label="食材の種類" value="25" />
      </section>

      {/* リピート率の高い料理 */}
      <section className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">リピート率の高い料理</h2>
        {repeatDishes.map((dish, i) => (
          <div
            key={dish.name}
            className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-800">{dish.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{dish.count}回</span>
              <span className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 font-semibold">
                {i + 1}位
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
