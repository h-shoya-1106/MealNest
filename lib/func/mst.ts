import { prisma } from "../../lib/prisma";

export async function getMstTimeZone() {
    return await prisma.mstTimeZone.findMany({
        select: {
            id: true,
            displayName: true,
        },
    });
}
