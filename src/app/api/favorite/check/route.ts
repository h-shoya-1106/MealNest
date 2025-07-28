import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../lib/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const { dishId } = await req.json();

    if (!userId || !dishId) {
        return new Response("Missing parameters", { status: 400 });
    }

    const favorite = await prisma.favorite.findUnique({
        where: {
        userId_dishId: {
            userId,
            dishId,
        },
        },
    });

    return Response.json({ isFavorite: !!favorite });
}
