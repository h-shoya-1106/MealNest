"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuForm from "../../../../../../features/calendar/components/Common/MenuForm";

export default function MenuEditPage() {
    const { date: rawDate } = useParams();
    const date = Array.isArray(rawDate) ? rawDate[0] : rawDate ?? "";
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch(`/api/menu/by-date/${date}`);
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
    }, [date]);

    if (error) return <p className="text-red-500">エラー: {error}</p>;
    if (!initialData) return <p>読み込み中...</p>;

    return <MenuForm date={date} initialData={initialData} isEdit />;
}
