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
      email: 'test@example.com',
      password: 'hashedpassword123', // 本番では bcrypt でハッシュ化すること
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // 献立（ユーザーや時間帯IDが必要なので仮で1にしてます）
  await prisma.menu.create({
    data: {
      userId: 1,
      name: 'テスト献立',
      timeZoneId: 1,
      calorie: 600,
      date: new Date(), // ← 追加
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
