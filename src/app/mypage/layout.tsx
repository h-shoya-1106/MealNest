"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const tabs = [
  { label: "プロフィール", href: "/mypage/profile" },
  { label: "統計情報", href: "/mypage/stats" },
  { label: "設定", href: "/mypage/setting" },
  { label: "ヘルプ", href: "/mypage/help" },
];

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* タブメニュー */}
      <nav className="flex justify-around border-b border-gray-200 px-4 py-3 bg-gray-50">
        {tabs.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`text-sm font-medium ${
                isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-400"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* 子ページの内容 */}
      <main className="flex-1 px-4 pt-4 pb-24">{children}</main>
    </div>
  );
}
