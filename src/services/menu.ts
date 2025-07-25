import { prisma } from "../lib/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";

// 日付をもとにmenuを取得
export async function getMenuByDate(userId: number, date: string) {
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
            },
            },
        },
    });
}

export async function getMenuByDateForWeek(userId: number, date: Date) {
    return await prisma.menu.findMany({
    where: {
        userId,
        date: {
        gte: startOfWeek(date, { weekStartsOn: 0 }),
        lte: endOfWeek(date, { weekStartsOn: 0 }),
        },
    },
    include: {
        timeZone: true,
        menuDishes: {
          include: {
            dish: {
              include: {
                  dishStatus: true,
              },
            },
          },
        },
    },
    orderBy: {
        timeZoneId: "asc",
    },
    });
}

export async function getMenuByDateForMonth(userId: number, date: Date) { 
  return await prisma.menu.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
    orderBy: {
      timeZoneId: "asc",
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
}
