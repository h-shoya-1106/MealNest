import { ChefHat, ChevronDown } from "lucide-react";

export const MenuAccordion = ({ isAccordionOpen, setIsAccordionOpen, selectedDates, menuData, formatDate }: any) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex justify-between items-center mb-4 text-lg font-semibold text-gray-800 bg-orange-50 px-4 py-3 rounded-xl hover:bg-orange-100 focus:outline-none"
            aria-expanded={isAccordionOpen}
        >
            <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-orange-500" />
                <span>選択した日の献立</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${isAccordionOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {isAccordionOpen && (
            <div className="space-y-6">
            {selectedDates.sort().map((dateString: string) => {
                const menuForDate = menuData[dateString];
                if (!menuForDate) {
                return (
                    <div key={dateString} className="text-gray-500">
                        {formatDate(dateString)} の献立は未設定です。
                    </div>
                );
                }
                return (
                <div key={dateString} className="border border-gray-200 rounded-xl p-4 bg-orange-50">
                    <div className="mb-3 font-medium text-orange-700">{formatDate(dateString)}</div>
                    {["breakfast", "lunch", "dinner"].map((timeZone) => {
                        const meal = menuForDate[timeZone];
                        if (!meal) return null;
                        return (
                            <div key={timeZone} className="mb-4">
                                <div className="text-sm font-semibold text-orange-600 mb-1 capitalize">
                                    {timeZone === "breakfast" ? "朝食" : timeZone === "lunch" ? "昼食" : "夕食"}
                                </div>
                                <div className="text-base font-semibold text-gray-900 mb-1">{meal.menuName}</div>
                                <ul className="list-disc list-inside text-gray-700">
                                    {meal.dishes.map((dish: string, i: number) => (
                                        <li key={i}>{dish}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
};
