import { requireLogin } from "@/lib/requireLogin";
import { prisma } from "../../../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await requireLogin();
  const userId = Number(session.user.id);

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        dish: {
          include: {
            // category: true,
            dishMaterials: {
              include: { material: true }
            }
          }
        }
      }
    });

    const formatted = favorites.map((fav) => ({
      name: fav.dish.name,
      // category: fav.dish.category.name,
      ingredients: fav.dish.dishMaterials.map((dm) => dm.material.displayName),
    }));

    return NextResponse.json({ favorites: formatted });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}