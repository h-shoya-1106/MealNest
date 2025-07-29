import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, email } = body;

    if (!userId || !email) {
      return NextResponse.json({ message: "不正なリクエスト" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return NextResponse.json({ message: "更新に失敗しました" }, { status: 500 });
  }
}
