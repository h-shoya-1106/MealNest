"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { PATHS } from '@/constants/paths';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: PATHS.LOGIN })}
      className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition"
    >
      <LogOut className="w-4 h-4" />
      ログアウト
    </button>
  );
}
