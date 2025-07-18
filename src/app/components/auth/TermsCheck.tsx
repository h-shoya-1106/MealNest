// 利用規約同意
import { Check } from "lucide-react";

type Props = {
    acceptTerms: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function TermsCheck({acceptTerms, onChange}: Props) {
    return (
        <div className="flex items-start space-x-3">
            <div className="relative">
                <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={onChange}
                    className="w-5 h-5 text-orange-500 bg-gray-50 border-gray-300 rounded focus:ring-orange-300 focus:ring-2 mt-0.5"
                />
                {acceptTerms && (
                    <Check className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none" />
                )}
            </div>
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">利用規約</a>
                および
                <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">プライバシーポリシー</a>
                に同意します
            </label>
        </div>
    );
}