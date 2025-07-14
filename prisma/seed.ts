import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  // 時間帯マスタ（朝・昼・夜）
  await prisma.mstTimeZone.createMany({
    data: [
      { displayName: '朝', createdAt: new Date(), updatedAt: new Date() },
      { displayName: '昼', createdAt: new Date(), updatedAt: new Date() },
      { displayName: '夜', createdAt: new Date(), updatedAt: new Date() },
    ],
  })

  // 栄養素マスタ
  await prisma.mstNutrient.createMany({
    data: [
      { displayName: 'タンパク質', unit: 'g', createdAt: new Date(), updatedAt: new Date() },
      { displayName: '脂質', unit: 'g', createdAt: new Date(), updatedAt: new Date() },
      { displayName: 'ビタミンC', unit: 'mg', createdAt: new Date(), updatedAt: new Date() },
    ],
  })

    await prisma.mstDishStatus.createMany({
      data: [
        { displayName: 'メイン', createdAt: new Date(), updatedAt: new Date() },
        { displayName: '副菜', createdAt: new Date(), updatedAt: new Date() },
        { displayName: '主菜', createdAt: new Date(), updatedAt: new Date() },
      ],
    })

  // 分量マスタ
  await prisma.mstQuantity.createMany({
    data: [
      { displayName: '大さじ1杯', createdAt: new Date(), updatedAt: new Date() },
      { displayName: '100g', createdAt: new Date(), updatedAt: new Date() },
      { displayName: '1個', createdAt: new Date(), updatedAt: new Date() },
    ],
  })

  // 食材マスタ
  await prisma.mstMaterial.createMany({
    data: [
      { displayName: '鶏むね肉', createdAt: new Date(), updatedAt: new Date() },
      { displayName: 'にんじん', createdAt: new Date(), updatedAt: new Date() },
      { displayName: 'ブロッコリー', createdAt: new Date(), updatedAt: new Date() },
    ],
  })

  // 仮のユーザー
  await prisma.user.create({
    data: {
      name: 'テストユーザー',
      email: 'sample@example.com',
      password: 'hashedpassword123', // 本番では bcrypt でハッシュ化すること
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // 献立（ユーザーや時間帯IDが必要なので仮で1にしてます）
  await prisma.menu.createMany({
    data: [
      {
        userId: 1,
        name: 'テスト献立',
        timeZoneId: 1,
        calorie: 600,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        name: '肉じゃが定食',
        timeZoneId: 1,
        calorie: 600,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  })

  // 料理
  await prisma.dish.createMany({
    data: [
      {
        name: 'カレーライス',
        dishStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '肉じゃが',
        dishStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ジャムパン',
        dishStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '納豆パスタ',
        dishStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  await prisma.menuDish.createMany({
    data: [
      {
        menuId: 1,
        dishId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        menuId: 1,
        dishId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        menuId: 1,
        dishId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        menuId: 2,
        dishId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
  })

  console.log('シード完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
