import { prisma } from "../../lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

// 日付をもとにmenuを取得
export async function getMenuByDate(userId: number, date: Date) {
    return await prisma.menu.findMany({
        where: {
            userId,
            date: {
            gte: startOfDay(date),
            lte: endOfDay(date),
            },
        },
        select: {
            id: true,
            name: true,
            date: true,
            timeZone: {
            select: {
                displayName: true,
            },
            },
            menuDishes: {
            select: {
                id: true,
                amount: true,
                dish: {
                select: {
                    name: true,
                    dishStatus: {
                    select: {
                        displayName: true,
                    },
                    },
                },
                },
                quantity: {
                select: {
                    displayName: true,
                },
                },
            },
            },
        },
    });
}
