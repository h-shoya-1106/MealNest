// 背景やカードレイアウト
type Props = { children: React.ReactNode }

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
