import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const body = await req.json();
  const { userId, image } = body;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { image },
  });

  return NextResponse.json(updated);
}
