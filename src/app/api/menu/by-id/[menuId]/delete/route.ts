import { prisma } from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    context: any
) {
    const params = await context.params;
    const menuId = Number(params.menuId);

    if (isNaN(menuId)) {
        return NextResponse.json({ error: "Invalid menuId" }, { status: 400 });
    }

    try {
        await prisma.menuDish.deleteMany({ where: { menuId } });
        await prisma.menu.delete({ where: { id: menuId } });

        return NextResponse.json({ message: "Menu deleted" }, { status: 200 });
    } catch (error) {
        console.error("削除エラー:", error);
        return NextResponse.json({ error: "削除失敗" }, { status: 500 });
    }
}
