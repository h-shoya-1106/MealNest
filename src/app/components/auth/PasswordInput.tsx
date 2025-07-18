// パスワードの入力フォーム
import { Eye, EyeOff, Lock } from "lucide-react"
import { useState } from "react";

type Props = {
    value: string,
    onChange: (v: string) => void
}

export default function PasswordInput({ value, onChange}: Props) {
    const [show, setShow] = useState(false);

    return (
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
        <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="パスワードを入力"
                required
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
        </div>
    );
}