"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { API } from "@/constants/api";

type Props = {
  label: string;
  value: string;
  onClose: () => void;
};

export default function StatDetailModal({ label, value, onClose }: Props) {
  const [detailData, setDetailData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const timeZones = ["すべて", "朝", "昼", "夜"];
  const [selectedZone, setSelectedZone] = useState("すべて");

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        let response;
        switch (label) {
          case "献立数":
            response = await fetch(API.STATS.MENU);
            break;
          case "お気に入り":
            response = await fetch(API.STATS.FAVORITE);
            break;
          case "献立継続日数":
            response = await fetch(API.STATS.CONTINUOUS);
            break;
          case "食材の種類":
            response = await fetch(API.STATS.MATERIALS);
            break;
          default:
            return;
        }
        const data = await response.json();
        setDetailData(data);
      } catch (err) {
        console.error("データ取得エラー:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [label]);

  const renderContent = () => {
    if (loading) return <p className="text-gray-500 text-sm">読み込み中...</p>;
    if (!detailData) return <p className="text-gray-500 text-sm">データがありません。</p>;

    switch (label) {
      case "献立数":
        const filteredMenus =
          selectedZone === "すべて"
            ? detailData.menus
            : detailData.menus.filter((menu: any) => menu.timeZone === selectedZone);

        return (
          <div className="space-y-2">
            {/* 絞り込みボタン */}
            <div className="flex gap-2 mb-2">
              {timeZones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    selectedZone === zone
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* 献立一覧 */}
            <ul className="space-y-2">
              {filteredMenus.map((menu: any, i: number) => (
                <li key={i} className="border-b pb-2 text-sm">
                  <p>
                    {format(new Date(menu.date), "yyyy/MM/dd", { locale: ja })}（
                    {menu.timeZone}）
                  </p>
                  <p className="text-gray-700 font-semibold">{menu.title}</p>
                </li>
              ))}
            </ul>
          </div>
        );

      case "お気に入り":
        return (
          <ul className="space-y-3">
            {detailData.favorites.map((dish: any, i: number) => (
              <li key={i} className="border-b pb-3 text-sm">
                <p className="font-bold text-gray-800">{dish.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dish.ingredients.map((ing: string, j: number) => (
                    <span
                      key={j}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        );

      case "献立継続日数":
        return (
          <div className="text-sm text-gray-700">
            <p>
              {format(new Date(detailData.startDate), "yyyy年M月d日", { locale: ja })} ～{" "}
              {format(new Date(detailData.endDate), "yyyy年M月d日", { locale: ja })}
            </p>
          </div>
        );

      case "食材の種類":
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {detailData.materials.map((mat: any, i: number) => (
              <li key={i}>{mat.name}</li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-2">{label}</h2>
        <p className="text-2xl font-semibold text-gray-700 mb-4">{value}</p>

        {renderContent()}
      </div>
    </div>
  );
}
