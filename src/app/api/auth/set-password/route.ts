import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
        password: hashed,
    },
  });

  return NextResponse.json({ ok: true });
}
