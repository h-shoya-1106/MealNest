// ログイン状態とパスワード忘れた方へのリンク
export default function RememberAndForgot() {
    return (
        <div className="flex items-center justify-between">
            <label className="flex items-center">
            <input
                type="checkbox"
                className="w-4 h-4 text-orange-500 bg-gray-50 border-gray-300 rounded focus:ring-orange-300 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
            </label>
            {/* TODO リンク追加 */}
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 transition-colors">
                パスワードを忘れた方
            </a>
        </div>
    )
}