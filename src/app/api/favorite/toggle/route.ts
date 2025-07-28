import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dishId } = await req.json();
  const userId = Number(session.user.id);

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_dishId: { userId, dishId },
    },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    });
    return NextResponse.json({ status: "removed" });
  } else {
    await prisma.favorite.create({
      data: { userId, dishId },
    });
    return NextResponse.json({ status: "added" });
  }
}
