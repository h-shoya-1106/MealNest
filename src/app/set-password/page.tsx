"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SetPasswordPage() {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/auth/set-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    window.location.href = "/home"; // 登録後ホームへ
  };

  return (
    <div>
      <h2>パスワードを設定してください</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>登録</button>
    </div>
  );
}
