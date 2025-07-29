import { differenceInCalendarDays } from "date-fns";
import { prisma } from "../../prisma"
import { DishMaterial, MenuDish } from "@prisma/client";

export async function fetchStats(userId: number) {
  // 献立一覧
  const menuList = await prisma.menu.findMany({
    where: {
      userId,
    },
    select: { id: true },
  });

  const menuIds = menuList.map(menu => menu.id);

  // すべての menuId に紐づく menuDish を取得
  const menuDishList: MenuDish[] = await prisma.menuDish.findMany({
    where: {
      menuId: { in: menuIds },
    },
  });

  const dishIds = [...new Set(menuDishList.map(dish => dish.dishId))];

  // dishId に対応する dishMaterial を一括取得（重複除外）
  const allDishMaterials: DishMaterial[] = await prisma.dishMaterial.findMany({
    where: {
      dishId: { in: dishIds },
    },
  });

  // materialId の重複を排除
  const uniqueMaterialIds = new Set(allDishMaterials.map(mat => mat.materialId));
  const materialCount = uniqueMaterialIds.size;

  // メニュー数（念のため再取得）
  const menuCount: number = menuList.length;

  // お気に入り数
  const favorite: number = await prisma.favorite.count({
    where: { userId },
  });

  // 連続日数
  const continuousDays: number = await fetchContinuousDays(userId);

  // 上位の料理ランキング（dishId, name, count）
  const dishRankingList = await fetchTopDish(menuDishList);

  return { menuCount, favorite, continuousDays, materialCount, dishRankingList };
}

// 献立の連続作成日数を取得する
async function fetchContinuousDays(userId: number){
    const menuList = await prisma.menu.findMany({
        where: {
            userId,
        },
        select: {
            date: true,
        },
        orderBy: {
            date: "asc",
        },
    });

    // 1. 日付を昇順でソート（すでにしてる）
    // 2. 連続日数を数える
    let maxStreak = 0;
    let currentStreak = 0;
    let previousDate: Date | null = null;

    for (const menu of menuList) {
        const currentDate = new Date(menu.date);

        if (previousDate) {
            const diff = differenceInCalendarDays(currentDate, previousDate);

            if (diff === 1) {
            currentStreak += 1;
            } else if (diff > 1) {
            currentStreak = 1;
            }
        } else {
            currentStreak = 1;
        }

        if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
        }

        previousDate = currentDate;
    }
    return maxStreak;
}

async function fetchTopDish(menuDishList: MenuDish[]) {
  const dishCountMap = new Map<number, number>();

  // 出現回数をカウント
  for (const item of menuDishList) {
    const count = dishCountMap.get(item.dishId) || 0;
    dishCountMap.set(item.dishId, count + 1);
  }

  // 上位5件抽出
  const sortedEntries = Array.from(dishCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // 上位5件

  const topDishIds = sortedEntries.map(([dishId]) => dishId);

  // dish名を取得
  const dishList = await prisma.dish.findMany({
    where: {
      id: { in: topDishIds },
    },
  });

  // 出現順に並べてリストを構築
  const dishRankingList = sortedEntries.map(([dishId, count]) => {
    const dish = dishList.find(d => d.id === dishId);
    return {
      id: dishId,
      name: dish?.name || "不明な料理",
      count,
    };
  });

  return dishRankingList;
}

