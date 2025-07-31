import { prisma } from "./prisma"

export async function fetchUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("ユーザーが見つかりませんでした");
  }

  return user;
}

