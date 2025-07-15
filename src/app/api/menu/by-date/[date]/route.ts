import { prisma } from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { date?: string } } // ← undefined 対応
) {
  const { date } = params;

  if (!date) {
    return NextResponse.json({ error: "日付が指定されていません" }, { status: 400 });
  }

  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "不正な日付形式です" }, { status: 400 });
    }

    const menu = await prisma.menu.findFirst({
      where: {
        date: parsedDate,
        deletedAt: null,
      },
      include: {
        menuDishes: {
          include: {
            dish: {
              include: {
                dishMaterials: {
                  include: {
                    material: true,
                    quantity: true,
                  },
                },
                dishStatus: true,
              },
            },
          },
        },
        timeZone: true,
      },
    });

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
