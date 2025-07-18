// 新規登録へのリンク
import { usePathname } from "next/navigation";

export default function SwitchAuthLink() {
    const pathname = usePathname();
    const commonLabel = 
        pathname === '/register'
          ? 'すでにアカウントをお持ちの方は '
          : 'アカウントをお持ちでない方は ';
    const linkLabel = 
        pathname === '/register'
          ? 'ログイン '
          : 'こちらから新規登録 ';
    const route = 
        pathname === '/register'
          ? '/login'
          : '/register';
    
    return (
        <p className="text-center text-gray-600 mt-8">
            {commonLabel}
            <a href={route} className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                {linkLabel}
            </a>
        </p>
    );
}
