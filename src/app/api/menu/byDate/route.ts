// 日付けに応じてデータを取得したり、新規保存、編集、削除を行う
import { getMenuByDate } from "../../../../../lib/func/menu"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const userIdStr = searchParams.get('userId');
    if (!dateStr || !userIdStr) {
        return NextResponse.json({ error: "date and userId are required" }, { status: 400 });
    }

    const menu = await getMenuByDate(Number(userIdStr), dateStr);

    return NextResponse.json(menu);
}


