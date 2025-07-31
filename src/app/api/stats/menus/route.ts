import { requireLogin } from "@/lib/requireLogin";
import { prisma } from "../../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await requireLogin();
  const userId = Number(session.user.id);

  // ユーザーの全メニューを取得
  const menus = await prisma.menu.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
      name: true,
      timeZone: {
        select: { displayName: true },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  // 整形
  const formattedMenus = menus.map(menu => ({
    date: menu.date.toISOString().split('T')[0],
    timeZone: menu.timeZone.displayName,
    title: menu.name,
  }));
  return NextResponse.json({ menus: formattedMenus });
}