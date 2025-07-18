// ヘッダー部分(アイコンとテキスト表示)
import { ChefHat, Utensils } from 'lucide-react';

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <ChefHat className="w-10 h-10 text-white" />
      </div>
      {/* TODO ここに新規登録の場合はこんにちはを入れる？ */}
      <p className="text-gray-600 flex items-center justify-center">
        <Utensils className="w-4 h-4 mr-1" />
        今日の献立を考えましょう
      </p>
    </div>
  );
}