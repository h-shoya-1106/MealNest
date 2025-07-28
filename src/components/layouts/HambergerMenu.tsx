"use client";

import { useState } from "react";
import { Menu, X, Home, Calendar, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 shadow-md bg-white fixed top-0 left-0 right-0 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 className="text-xl font-semibold">献立管理</h1>
        <div className="w-7" />
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-16 flex flex-col gap-6 px-4">
          <Link href="/home" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <Home /> <span>Home</span>
          </Link>
          <Link href="/calendar" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <Calendar /> <span>カレンダー</span>
          </Link>
          <Link href="/shop-list" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <ShoppingCart /> <span>買い物リスト</span>
          </Link>
          <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <User /> <span>プロフィール</span>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
