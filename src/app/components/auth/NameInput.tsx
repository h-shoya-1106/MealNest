// ユーザー名の入力フォーム
import { User } from "lucide-react";

type Props = {
    value: string,
    onChange: (v: string) => void
}
export default function NameInput({value, onChange}: Props) {
    return(
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                お名前
            </label>
            <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
                    placeholder="山田太郎"
                    required
                />
            </div>
        </div>
    );
}