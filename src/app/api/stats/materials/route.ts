import { requireLogin } from "@/lib/requireLogin";
import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await requireLogin();
  const userId = Number(session.user.id);

  // ユーザーのmenu一覧を取得
  const menuList = await prisma.menu.findMany({
    where: { userId },
    select: { id: true },
  });
  const menuIds = menuList.map(menu => menu.id);

  // menuに紐づくmenuDishを取得
  const menuDishList = await prisma.menuDish.findMany({
    where: { menuId: { in: menuIds } },
    select: { dishId: true },
  });
  const dishIds = [...new Set(menuDishList.map(d => d.dishId))];

  // dishに紐づくdishMaterialを取得
  const dishMaterialList = await prisma.dishMaterial.findMany({
    where: { dishId: { in: dishIds } },
    select: { materialId: true },
  });
  const materialIds = [...new Set(dishMaterialList.map(m => m.materialId))];

  // materialIdからmaterial名を取得
  const materialList = await prisma.mstMaterial.findMany({
    where: { id: { in: materialIds } },
    select: { displayName: true },
  });

  // 整形して返す
  const data = {
    materials: materialList.map(mat => ({ name: mat.displayName })),
  };

  return NextResponse.json(data);
}
