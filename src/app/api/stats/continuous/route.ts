import { requireLogin } from "@/lib/requireLogin";
import { prisma } from "../../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { format, parseISO, differenceInCalendarDays } from "date-fns";

export async function GET() {
  const session = await requireLogin();
  const userId = Number(session.user.id);

  const menus = await prisma.menu.findMany({
    where: { userId },
    orderBy: { date: "asc" }, // 昇順で取得
    select: { date: true },
  });

  const dates = Array.from(
    new Set(menus.map(menu => format(new Date(menu.date), "yyyy-MM-dd")))
  ).map(dateStr => parseISO(dateStr));

  if (dates.length === 0) {
    return NextResponse.json({
      maxStreak: 0,
      startDate: null,
      endDate: null,
    });
  }

  let maxStreak = 1;
  let currentStreak = 1;

  let maxStartDate = dates[0];
  let maxEndDate = dates[0];

  let tempStart = dates[0];
  let tempEnd = dates[0];

  for (let i = 1; i < dates.length; i++) {
    const diff = differenceInCalendarDays(dates[i], dates[i - 1]);

    if (diff === 1) {
      currentStreak++;
      tempEnd = dates[i];
    } else if (diff > 1) {
      if (
        currentStreak > maxStreak ||
        (currentStreak === maxStreak && tempEnd > maxEndDate)
      ) {
        maxStreak = currentStreak;
        maxStartDate = tempStart;
        maxEndDate = tempEnd;
      }

      // streakリセット
      currentStreak = 1;
      tempStart = dates[i];
      tempEnd = dates[i];
    }
  }

  // 最後の連続もチェック
  if (
    currentStreak > maxStreak ||
    (currentStreak === maxStreak && tempEnd > maxEndDate)
  ) {
    maxStreak = currentStreak;
    maxStartDate = tempStart;
    maxEndDate = tempEnd;
  }

  return NextResponse.json({
    startDate: format(maxStartDate, "yyyy-MM-dd"),
    endDate: format(maxEndDate, "yyyy-MM-dd"),
  });
}