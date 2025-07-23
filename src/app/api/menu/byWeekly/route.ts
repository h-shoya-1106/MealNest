// 週に応じてデータを取得したり、新規保存、編集、削除を行う
import { parseISO, isValid } from "date-fns";
import { getMenuByDateForWeek } from "../../../../services/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));
    const dateStr = searchParams.get("date");

    if (!userId || !dateStr) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const date = parseISO(dateStr);
    if (!isValid(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    try {
        const menus = await getMenuByDateForWeek(userId, date);
        return NextResponse.json(menus);
    } catch (err) {
        console.error("API Error (byWeekly):", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
