"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuForm from "../../../../../../features/calendar//components/Common/MenuForm"; // 共通フォームにしておくと便利

export default function MenuEditPage() {
    const { date } = useParams();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
    const fetchMenu = async () => {
        const res = await fetch(`/api/menu/${date}/get`);
        const data = await res.json();
        setInitialData(data);
    };
    fetchMenu();
    }, [date]);

    if (!initialData) return <p>読み込み中...</p>;

    return <MenuForm date={date as string} initialData={initialData} isEdit />;
}
