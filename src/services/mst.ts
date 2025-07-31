import { prisma } from "../lib/prisma";

export async function getMstTimeZone() {
    return await prisma.mstTimeZone.findMany({
        select: {
            id: true,
            displayName: true,
        },
    });
}

export async function getMstDishStatus() {
    return await prisma.mstDishStatus.findMany({
        select: {
            id: true,
            displayName: true,
        },
    });
}

export async function getMstQuantity() {
    return await prisma.mstQuantity.findMany({
        select: {
            id: true,
            displayName: true,
        },
    });
}
