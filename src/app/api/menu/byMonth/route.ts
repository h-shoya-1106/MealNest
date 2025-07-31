// 月付けに応じてデータを取得したり、新規保存、編集、削除を行う
import { getMenuByDateForMonth } from "../../../../services/menu"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date"); // e.g., "2025-07"
    const userIdStr = searchParams.get('userId');

    if (!dateStr || !userIdStr) {
    return NextResponse.json({ error: "date and userId are required" }, { status: 400 });
    }

    // 月指定だけど、"YYYY-MM" を "YYYY-MM-01" に変換し Date 型にする
    const date = new Date(`${dateStr}-01`);
    const userId = Number(userIdStr);

    const menu = await getMenuByDateForMonth(userId, date);

    return NextResponse.json(menu);
}
