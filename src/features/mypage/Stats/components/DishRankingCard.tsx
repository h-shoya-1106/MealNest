import { Flame } from "lucide-react";

type DishRankingCardProps = {
  name: string;
  count: number;
  rank: number;
};

export const DishRankingCard = ({ name, count, rank }: DishRankingCardProps) => (
  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3">
      <Flame className="w-4 h-4 text-orange-500" />
      <span className="text-sm font-medium text-gray-800">{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{count}回</span>
      <span className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 font-semibold">
        {rank}位
      </span>
    </div>
  </div>
);
