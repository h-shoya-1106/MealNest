import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { formatDate } from "../../../lib/func/util/formatDate";

export const ShoppingHeader = ({
  selectedDates,
  isCalendarOpen,
  setIsCalendarOpen,
  currentMonth,
  changeMonth,
  weekDays,
  generateCalendarDays,
  handleDateToggle,
  menuData,
}: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-3 rounded-full">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">買い物リスト</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="relative">
                <button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 rounded-lg px-4 py-2 transition-all duration-200 border border-orange-300"
                >
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800 font-medium">
                    {selectedDates.length === 1
                      ? formatDate(selectedDates[0])
                      : `${selectedDates.length}日分選択中`}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-orange-600 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isCalendarOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-20 min-w-80">
                    <div className="flex justify-center mb-4">
                      <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                      </button>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
                      </h3>
                      <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekDays.map((day: string) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day: any, index: number) => {
                        const isSelected = selectedDates.includes(day.dateString);
                        const hasMenu = !!menuData[day.dateString];

                        return (
                          <button
                            key={index}
                            onClick={() => day.isCurrentMonth && handleDateToggle(day.dateString)}
                            disabled={!day.isCurrentMonth}
                            className={`p-2 text-sm rounded-lg relative ${day.isCurrentMonth ? 'hover:bg-orange-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'} ${isSelected ? 'bg-orange-500 text-white font-semibold' : day.isToday ? 'bg-orange-100 text-orange-800 font-semibold' : 'text-gray-700'} ${hasMenu && day.isCurrentMonth ? 'border-2 border-orange-300' : ''}`}
                          >
                            {day.date}
                            {hasMenu && day.isCurrentMonth && <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span>献立設定済み</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span>選択中</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
