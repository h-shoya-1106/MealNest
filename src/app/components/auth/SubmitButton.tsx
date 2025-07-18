import { Heart } from "lucide-react";

type Props = {
    handleSubmit: () => void,
    isLoading: boolean,
}

export default function SubmitButton({ handleSubmit, isLoading}: Props) {
    return (
        <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-md"
        >
            {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
            <>
                <Heart className="w-5 h-5 mr-2" />
                ログイン
                {/* アカウントを作成 */}
            </>
            )}
        </button>
    );
}