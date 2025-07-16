import { Trash2, Pencil, Plus } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Menu } from "../../types";
import { MstTimeZone } from "@prisma/client";

export type MenuCardProps = {
    day: string; // yyyy-MM-dd
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
    const title = isMonthView
        ? format(new Date(day), "yyyy/MM/dd")
        : format(new Date(day), "EEEE");

    // 登録済みの時間帯のメニューのみ抽出
    const meals = menuList.filter((meal) =>
        mstTimeZone.some((tz) => tz.id === meal.timeZone.id)
    );

    // まだ登録されていない時間帯があるかチェック
    const registeredTimeZoneIds = menuList.map((m) => m.timeZone.id);
    const showGlobalCreateButton =
        mstTimeZone.some((tz) => !registeredTimeZoneIds.includes(tz.id));

    const cardContent = (
        <div className="border rounded-xl p-3 shadow-sm bg-white relative">
        {/* タイトル + グローバル登録ボタン */}
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

        {/* 登録済みの時間帯のみ表示 */}
        {meals.length > 0 ? (
            meals.map((meal) => {
            const timeZone = mstTimeZone.find((tz) => tz.id === meal.timeZone.id);

            return (
                <div
                key={meal.id}
                className="flex justify-between items-center py-1"
                >
                <div>
                    {timeZone?.displayName ?? "時間不明"}: {meal.name}
                </div>
                <div className="flex space-x-2">
                    {onEdit && (
                    <button
                        onClick={() =>
                        onEdit(day, timeZone?.displayName ?? "")
                        }
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
        </div>
    );

    return isMonthView ? (
        <motion.div layout>{cardContent}</motion.div>
    ) : (
        cardContent
    );
};
