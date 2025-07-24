"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuForm from "./MenuForm";
import { API } from "@/constants/api";

type Props = {
  userId: number;
};

export default function MenuFormClient({ userId }: Props) {
  const { date: rawDate } = useParams();
  const date = Array.isArray(rawDate) ? rawDate[0] : rawDate ?? "";
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(API.MENU.GET_BY_USER_ID("by-date", userId, date));
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error ?? "不明なエラーが発生しました");
          return;
        }
        const data = await res.json();
        setInitialData(data);
      } catch (err) {
        setError("ネットワークエラーまたは不明なエラーが発生しました");
      }
    };

    if (date) {
      fetchMenu();
    }
  }, [date, userId]);
  console.log(initialData)

  if (error) return <p className="text-red-500">エラー: {error}</p>;
  if (!initialData) return <p>読み込み中...</p>;

  return <MenuForm date={date} initialData={initialData} isEdit />;
}
