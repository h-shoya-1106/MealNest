// ログイン方法を区切るための要素
export default function AuthDivider() {
    return (
        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">または</span>
            </div>
        </div>
    );
}