// ヘッダー部分(アイコンとテキスト表示)
import { ChefHat, Utensils } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AuthHeader() {
    const pathname = usePathname();
    const headName =
        pathname === '/register'
          ? 'はじめまして'
          : 'おかえりなさい';
    const oneWord =
        pathname === '/register'
          ? '美味しい献立を一緒に作りましょう'
          : '今日の献立を考えましょう';

    return (
        <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <ChefHat className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{headName}</h1>
        <p className="text-gray-600 flex items-center justify-center">
            <Utensils className="w-4 h-4 mr-1" />
            {oneWord}
        </p>
        </div>
    );
}