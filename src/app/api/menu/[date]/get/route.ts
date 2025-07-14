import { prisma } from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { date: string } }) {
    const date = new Date(params.date);

    const menu = await prisma.menu.findFirst({
        where: { date },
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
        },
    });

    return NextResponse.json(menu);
}
