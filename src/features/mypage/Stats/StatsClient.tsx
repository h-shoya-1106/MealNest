"use client";

import { useState } from "react";
import { ListOrdered, Heart, Calendar, Tag } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { DishRankingCard } from "./components/DishRankingCard";
import StatDetailModal from "./components/StatDetailModal";

type Props = {
  menuCount: number;
  favorite: number;
  continuousDays: number;
  materialCount: number;
  dishRankingList: Array<{ id: number; name: string; count: number }>;
};

type StatItem = {
  label: string;
  value: string;
};

export default function StatsClient({
  menuCount,
  favorite,
  continuousDays,
  materialCount,
  dishRankingList,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);

  const handleCardClick = (label: string, value: string) => {
    setSelectedStat({ label, value });
    setIsOpen(true);
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={<ListOrdered size={20} />}
          label="献立数"
          value={menuCount.toLocaleString()}
          onClick={() => handleCardClick("献立数", menuCount.toLocaleString())}
        />
        <StatCard
          icon={<Heart size={20} />}
          label="お気に入り"
          value={favorite.toLocaleString()}
          onClick={() => handleCardClick("お気に入り", favorite.toLocaleString())}
        />
        <StatCard
          icon={<Calendar size={20} />}
          label="献立継続日数"
          value={continuousDays.toLocaleString()}
          onClick={() => handleCardClick("献立継続日数", continuousDays.toLocaleString())}
        />
        <StatCard
          icon={<Tag size={20} />}
          label="食材の種類"
          value={materialCount.toLocaleString()}
          onClick={() => handleCardClick("食材の種類", materialCount.toLocaleString())}
        />
      </section>

      {/* モーダル */}
      {isOpen && selectedStat && (
        <StatDetailModal
          label={selectedStat.label}
          value={selectedStat.value}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* リピート率の高い料理 */}
      <section className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">リピート率の高い料理</h2>
        {dishRankingList.map((dish, i) => (
          <DishRankingCard key={dish.id} name={dish.name} count={dish.count} rank={i + 1} />
        ))}
      </section>
    </>
  );
}
