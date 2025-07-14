import { prisma } from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const menuId = Number(params.id);

    const { menuName, calorie, timeZoneId, dishes } = body;

    try {
        // 一度関連データを削除（メニュー→料理→材料）
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
            create: dishes.map((dish) => ({
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
