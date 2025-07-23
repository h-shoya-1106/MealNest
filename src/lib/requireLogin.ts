// src/app/lib/requireLogin.ts
import { PATHS } from "@/constants/paths";
import { authOptions } from "../../lib/authOptions"; // 認証オプション
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function requireLogin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(PATHS.LOGIN);
  }
  return session;
}
