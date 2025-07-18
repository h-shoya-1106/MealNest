// 新規登録へのリンク
export default function SwitchAuthLink() {
    return (
        <p className="text-center text-gray-600 mt-8">
            アカウントをお持ちでない方は{' '}
            <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
                こちらから新規登録
            </a>
        </p>
    );
}
