"use client";

export default function SettingClient() {
  return (
    <section className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">設定</h2>
      <ul className="text-sm space-y-2">
        <li>
          <button className="text-blue-600 hover:underline">パスワード変更</button>
        </li>
        <li>
          <button className="text-red-600 hover:underline">ログアウト</button>
        </li>
      </ul>
    </section>
  );
}
