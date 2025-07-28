"use client";

export default function HelpClient() {
  return (
    <section className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">ヘルプ</h2>
      <ul className="text-sm space-y-2">
        <li>
          <button className="text-blue-600 hover:underline">よくある質問</button>
        </li>
        <li>
          <button className="text-blue-600 hover:underline">お問い合わせ</button>
        </li>
      </ul>
    </section>
  );
}
