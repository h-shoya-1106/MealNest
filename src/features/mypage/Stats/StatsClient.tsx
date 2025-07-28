"use client";

export default function StatsClient() {
  return (
    <section className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">統計情報</h2>
      <ul className="text-sm space-y-1">
        <li>✅ 今まで作成した献立数：34件</li>
        <li>❤️ お気に入り料理数：12件</li>
        <li>📅 献立継続日数：18日</li>
        <li>🥬 食材の種類：52種</li>
        <li>🔁 リピート率の高い料理 TOP5</li>
      </ul>
    </section>
  );
}
