// 週に応じてデータを取得したり、新規保存、編集、削除を行う
import { getMenuByDateForMonth } from "../../../../../lib/func/menu"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const userIdStr = searchParams.get('userId');

    if (!dateStr || !userIdStr) {
    return NextResponse.json({ error: "date and userId are required" }, { status: 400 });
    }

    const date = new Date(`${dateStr}-01`);
    const userId = Number(userIdStr);

    const menu = await getMenuByDateForMonth(userId, date);

    return NextResponse.json(menu);
}
