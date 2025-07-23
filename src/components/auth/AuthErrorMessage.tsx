// エラーの表示
type Props = { error: string}

export default function AuthErrorMessage({ error }: Props){
    return (
        error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
        )
    );
}