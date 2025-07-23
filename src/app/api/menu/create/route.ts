import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const {
        date,
        menuName,
        calorie,
        timeZoneId,
        dishes,
    }: {
        date: string;
        menuName: string;
        calorie: number;
        timeZoneId: number;
        dishes: {
            name: string;
            dishStatusId: number;
            materials: {
                materialName: string;
                quantityId: number;
                amount: number | null;
            }[];
        }[];
    } = body;

    try {
        const menu = await prisma.menu.create({
            data: {
                userId: 1,
                name: menuName,
                date: new Date(date),
                timeZoneId,
                calorie,
                menuDishes: {
                    create: await Promise.all(
                        dishes.map(async (dish) => {
                            return {
                                dish: {
                                    create: {
                                        name: dish.name,
                                        dishStatus: {
                                            connect: {
                                                id: dish.dishStatusId,
                                            },
                                        },
                                        dishMaterials: {
                                            create: await Promise.all(
                                                dish.materials.map(async (material) => ({
                                                    material: {
                                                        connectOrCreate: {
                                                            where: { displayName: material.materialName },
                                                            create: { displayName: material.materialName },
                                                        },
                                                    },
                                                    quantity: {
                                                        connect: {
                                                            id: material.quantityId,
                                                        },
                                                    },
                                                    amount: material.amount,
                                                }))
                                            ),
                                        },
                                    },
                                },
                            };
                        })
                    ),
                },
            },
        });

        return NextResponse.json(menu);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "登録に失敗しました" },
            { status: 500 }
        );
    }
}
