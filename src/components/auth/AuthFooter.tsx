// ログイン画面のフッター
import { Heart } from "lucide-react";

export default function AuthFooter() {
    return (
        <div className="text-center mt-6 text-gray-500 text-sm">
            <p className="flex items-center justify-center">
                <Heart className="w-4 h-4 mr-1 text-red-400" />
                美味しい献立で、毎日をもっと楽しく
            </p>
        </div>
    );
}