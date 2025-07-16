import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";

// 仮ユーザーID
const USER_ID = 1;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "date query is required" }, { status: 400 });
  }

  const date = new Date(dateStr);

  try {
    const menus = await prisma.menu.findMany({
      where: {
        userId: USER_ID,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
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

    // UI表示用の menuData を整形
    const menuData: Record<string, any> = {};
    for (const menu of menus) {
      const zone = menu.timeZone.displayName;
      menuData[dateStr] = menuData[dateStr] || {};
      menuData[dateStr][zone] = {
        menuName: menu.name,
        dishes: menu.menuDishes.map((md) => md.dish.name),
      };
    }

    // 材料リストを抽出して結合
    const materials = menus.flatMap((menu) =>
      menu.menuDishes.flatMap((md) =>
        md.dish.dishMaterials.map((dm) => ({
          id: `${menu.id}-${md.dish.id}-${dm.material.id}`,
          name: dm.material.displayName,
          quantity: dm.quantity.displayName,
          amount: dm.amount,
          meals: [menu.timeZone.displayName],
        }))
      )
    );

    console.log(menuData, materials)
    console.log(materials[0])

    return NextResponse.json({ menuData, materials });
  } catch (error) {
    console.error("[shoplist] fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
