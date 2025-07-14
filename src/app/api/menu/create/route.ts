import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { parseISO } from "date-fns";

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
            quantityId: number;
            amount: number | null;
        }[];
    } = body;

    try {
        const menu = await prisma.menu.create({
            data: {
                userId: 1,
                name: menuName,
                date: parseISO(date),
                timeZoneId,
                calorie,
                menuDishes: {
                    create: dishes.map((dish) => ({
                        dish: {
                            create: {
                                name: dish.name,
                                dishStatusId: dish.dishStatusId,
                            },
                        },
                        quantity: {
                            connect: {
                                id: dish.quantityId,
                            },
                        },
                        amount: dish.amount,
                    })),
                },
            },
            include: {
                menuDishes: true,
            },
        });

        return NextResponse.json(menu);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
    }
}