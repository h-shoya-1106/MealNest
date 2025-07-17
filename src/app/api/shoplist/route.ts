import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";

// 仮ユーザーID
const USER_ID = 1;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const datesParam = searchParams.get("dates");

  if (!datesParam) {
    return NextResponse.json({ error: "dates query is required" }, { status: 400 });
  }

  const dateStrings = datesParam.split(",");
  const dateRanges = dateStrings.map((ds) => ({
    gte: startOfDay(new Date(ds)),
    lte: endOfDay(new Date(ds)),
  }));

  try {
    // 複数日付に対応する where 条件を OR で構築
    const menus = await prisma.menu.findMany({
      where: {
        userId: USER_ID,
        OR: dateRanges.map((range) => ({ date: range })),
      },
      include: {
        timeZone: true,
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
              },
            },
          },
        },
      },
    });

    // 結果を日付ごとに整形
    const menuData: Record<string, any> = {};
    menus.forEach((menu) => {
      const dateStr = menu.date.toISOString().slice(0, 10);
      const zone = menu.timeZone.displayName;
      menuData[dateStr] = menuData[dateStr] || {};
      menuData[dateStr][zone] = {
        menuName: menu.name,
        dishes: menu.menuDishes.map((md) => md.dish.name),
      };
    });

    const materialMap = new Map<string, any>();

    menus.forEach((menu) => {
      menu.menuDishes.forEach((md) => {
        md.dish.dishMaterials.forEach((dm) => {
          const key = dm.material.displayName;

          if (!materialMap.has(key)) {
            materialMap.set(key, {
              id: dm.material.id,
              name: dm.material.displayName,
              quantity: dm.quantity.displayName,
              totalAmount: dm.amount,
              unit: dm.quantity.displayName ?? "",
              dishes: [md.dish.name],
            });
          } else {
            const existing = materialMap.get(key);
            existing.dishes.push(md.dish.name);
            existing.totalAmount += dm.amount ?? 0;
          }
        });
      });
    });

    const materials = Array.from(materialMap.values());

    console.log(materials)
    return NextResponse.json({ menuData, materials });
  } catch (error) {
    console.error("[shoplist] fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
