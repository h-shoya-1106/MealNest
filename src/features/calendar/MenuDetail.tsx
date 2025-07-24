"use client";

import { Menu } from "../../types";
import { Dialog } from "@headlessui/react";

type Props = {
  meal: Menu;
  onClose: () => void;
};

export const MenuDetail = ({ meal, onClose }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6">
          <h2 className="text-lg font-bold">献立詳細</h2>
          <p><strong>料理名:</strong> {meal.name}</p>
          <p><strong>時間帯:</strong> {meal.timeZone.displayName}</p>
          <p><strong>日付:</strong> {meal.date}</p>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
