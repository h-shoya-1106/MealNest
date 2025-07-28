"use client";

import { Settings } from "lucide-react";

export default function ProfileProfileClient() {
  return (
    <section className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">プロフィール</h2>
          <p className="text-sm text-gray-600">shoya@example.com</p>
          <p className="text-xs text-gray-500">2025年7月から利用中</p>
        </div>
        <button className="text-gray-500 hover:text-gray-800">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
