"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import ProfilePage from "../../app/mypage/profile/page";
import StatsPage from "../../app/mypage/stats/page";
import SettingPage from "../../app/mypage/setting/page";
import HelpPage from "../../app/mypage/help/page";

const tabs = ["プロフィール", "統計情報", "設定", "ヘルプ"];

export default function MyPageClient() {
  const [activeTab, setActiveTab] = useState("統計情報");

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* タブメニュー */}
      <div className="flex justify-around border-b border-gray-200 px-4 py-3 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-sm font-medium",
              tab === activeTab
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-400"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      <main className="flex-1 px-4 pt-4 pb-24">
        {activeTab === "プロフィール" && <ProfilePage />}
        {activeTab === "統計情報" && <StatsPage />}
        {activeTab === "設定" && <SettingPage />}
        {activeTab === "ヘルプ" && <HelpPage />}
      </main>
    </div>
  );
}
