"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, ListTodo, User } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { label: "Home", icon: Home, href: "/home" },
    { label: "Calendar", icon: Calendar, href: "/calendar" },
    { label: "ShopList", icon: ListTodo, href: "/shoplist" },
    { label: "Profile", icon: User, href: "/profile" },
];

export default function FooterNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-50">
        <ul className="flex justify-between items-center px-4 py-2">
            {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
                <li key={label} className="flex-1">
                <Link href={href} className="flex flex-col items-center text-xs text-gray-500 hover:text-orange-500">
                    <Icon
                        size={22}
                        className={clsx(
                            "mb-1",
                            isActive ? "text-orange-500" : "text-gray-400"
                        )}
                    />
                    <span className={isActive ? "text-orange-500 font-semibold" : ""}>{label}</span>
                </Link>
                </li>
            );
            })}
        </ul>
        </nav>
    );
}
