"use client";

import { Trash2, Pencil, Plus } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Menu } from "../../types";
import { MstTimeZone } from "@prisma/client";
import { useState } from "react";
import MenuDetail from "./MenuDetail";
import * as Dialog from "@radix-ui/react-dialog";

export type MenuCardProps = {
    day: string;
    menuList: Menu[];
    mstTimeZone: MstTimeZone[];
    onDelete: (menuId: number) => void;
    onEdit?: (day: string, timeZone: string) => void;
    onCreate?: (day: string) => void;
    isMonthView?: boolean;
};

export const MenuCard = ({
    day,
    menuList,
    mstTimeZone,
    onDelete,
    onEdit,
    onCreate,
    isMonthView = false,
}: MenuCardProps) => {
    const [selectedMeal, setSelectedMeal] = useState<Menu | null>(null);
    const title = isMonthView
        ? format(new Date(day), "yyyy/MM/dd")
        : format(new Date(day), "EEEE");

    const meals = menuList.filter((meal) =>
        mstTimeZone.some((tz) => tz.id === meal.timeZone.id)
    );

    const registeredTimeZoneIds = menuList.map((m) => m.timeZone.id);
    const showGlobalCreateButton = mstTimeZone.some(
        (tz) => !registeredTimeZoneIds.includes(tz.id)
    );

    const cardContent = (
        <div className="border rounded-xl p-3 shadow-sm bg-white relative">
            <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{title}</div>
                {showGlobalCreateButton && onCreate && (
                <button
                    onClick={() => onCreate(day)}
                    className="text-green-500 hover:text-green-700"
                >
                    <Plus size={20} />
                </button>
                )}
            </div>

            {meals.length > 0 ? (
                meals.map((meal) => {
                    const timeZone = mstTimeZone.find((tz) => tz.id === meal.timeZone.id);
                    return (
                        <div
                            key={meal.id}
                            className="flex justify-between items-center py-1"
                        >
                            <div
                                className="cursor-pointer hover:underline"
                                onClick={() => setSelectedMeal(meal)}
                            >
                                {timeZone?.displayName ?? "時間不明"}: {meal.name}
                            </div>
                            <div className="flex space-x-2">
                                {onEdit && (
                                <button
                                    onClick={() => onEdit(day, timeZone?.displayName ?? "")}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <Pencil size={16} />
                                </button>
                                )}
                                <button
                                    onClick={() => onDelete(meal.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-gray-500">献立が登録されていません</div>
            )}


            {selectedMeal && (
                <Dialog.Root open={!!selectedMeal} onOpenChange={(open) => !open && setSelectedMeal(null)}>
                    <Dialog.Portal>
                        <div className="fixed inset-0 bg-black/50">
                            <MenuDetail menu={selectedMeal} day={day} date={title} onClose={() => setSelectedMeal(null)} onEdit={onEdit} />
                        </div>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </div>
    );

    return isMonthView ? <motion.div layout>{cardContent}</motion.div> : cardContent;
};
