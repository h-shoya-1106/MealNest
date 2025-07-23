import { prisma } from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type MaterialInput = {
  materialName: string;
  quantityId: number;
  amount: number | null;
};

type DishInput = {
  name: string;
  dishStatusId: number;
  materials: MaterialInput[];
};

export async function PUT(
  req: NextRequest,
  context: any
) {
  const body = await req.json();
  const menuId = Number(context.params.menuId);

  // 明示的に型付けする
  const { menuName, calorie, timeZoneId, dishes }: { 
    menuName: string; 
    calorie: number | null; 
    timeZoneId: number; 
    dishes: DishInput[] 
  } = body;

  try {
    // 一度関連データを削除
    await prisma.menuDish.deleteMany({
      where: { menuId },
    });

    // 献立の更新
    await prisma.menu.update({
      where: { id: menuId },
      data: {
        name: menuName,
        calorie,
        timeZoneId,
        updatedAt: new Date(),
        menuDishes: {
          create: dishes.map((dish: DishInput) => ({
            dish: {
              create: {
                name: dish.name,
                dishStatus: { connect: { id: dish.dishStatusId } },
                dishMaterials: {
                  create: dish.materials.map((m) => ({
                    material: {
                      connectOrCreate: {
                        where: { displayName: m.materialName },
                        create: { displayName: m.materialName },
                      },
                    },
                    quantity: { connect: { id: m.quantityId } },
                    amount: m.amount,
                  })),
                },
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
