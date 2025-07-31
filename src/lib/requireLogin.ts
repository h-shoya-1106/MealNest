// src/app/lib/requireLogin.ts
import { PATHS } from "@/constants/paths";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

export async function requireLogin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(PATHS.LOGIN);
  }
  return session;
}
