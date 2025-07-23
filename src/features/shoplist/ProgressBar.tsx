export const ProgressBar = ({ getCheckedCount, getTotalItems, getProgressPercentage }: any) => {
    return (
        <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-gray-700">買い物進捗</div>
                    <div className="text-sm text-gray-500">{getCheckedCount()}/{getTotalItems()} 品目完了</div>
                </div>
                <div className="text-sm font-medium text-orange-600">{Math.round(getProgressPercentage())}%</div>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
                />
            </div>
        </div>
    );
};