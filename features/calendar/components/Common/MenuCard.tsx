import { Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Menu } from "../../types";

export type MealCardProps = {
    day: string; // yyyy-MM-dd
    menuList: Menu[];
    onDelete: (day: string) => void;
    onEdit?: (day: string) => void;
    isMonthView?: boolean;
};

export const MenuCard = ({ day, menuList, onDelete, onEdit, isMonthView = false }: MealCardProps) => {
    const title = isMonthView
        ? format(new Date(day), "yyyy/MM/dd")
        : format(new Date(day), "EEEE");

    const morning = menuList.find((m) => m.timeZone?.displayName === "朝");
    const lunch = menuList.find((m) => m.timeZone?.displayName === "昼");
    const dinner = menuList.find((m) => m.timeZone?.displayName === "夜");

    const hasMeal = morning || lunch || dinner;

    const cardContent = (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
        <div className="absolute top-2 right-2 flex space-x-2">
        {hasMeal && (
            <>
            {onEdit && (
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(day)}
                >
                <Pencil size={16} />
                </button>
            )}
            <button
                onClick={() => onDelete(day)}
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 size={16} />
            </button>
            </>
        )}
        </div>

        <h2 className="text-md font-bold mb-2 text-center">{title}</h2>

        {hasMeal ? (
            <div className="pl-2 space-y-1 text-sm">
                {morning && <p>Morning: {morning.name}</p>}
                {lunch && <p>Lunch: {lunch.name}</p>}
                {dinner && <p>Dinner: {dinner.name}</p>}
            </div>
        ) : (
            <p className="text-sm text-gray-400 italic pl-2">メニュー未登録</p>
        )}
    </div>
    );

    return isMonthView ? (
        <motion.div
            key="meal-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
        >
            {cardContent}
        </motion.div>
    ) : (
    cardContent
    );
};
