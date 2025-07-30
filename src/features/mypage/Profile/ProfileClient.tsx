"use client";

import { useRef, useState } from "react";
import { User } from "@prisma/client";
import { User as UserIcon, Camera } from "lucide-react";
import { API } from "@/constants/api";

type Props = {
  user: User;
};

export default function ProfileClient({ user }: Props) {
    const [name, setName] = useState(user.name ?? "");
    const [email, setEmail] = useState(user.email ?? "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        // Cloudinaryに画像をアップロード
        const cloudRes = await fetch(API.CLOUDINARY, {
            method: "POST",
            body: formData,
        });
        if (!cloudRes.ok) {
            alert("Cloudinaryへのアップロードに失敗しました");
            return;
        }
        const cloudData = await cloudRes.json();
        const imageUrl = cloudData.secure_url;

        // DBに imageUrl を保存
        const res = await fetch(API.PROFILE.IMAGE.UPLOAD, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            userId: user.id,
            image: imageUrl,
            }),
        });
        if (!res.ok) {
            alert("プロフィール画像の保存に失敗しました");
            return;
        }

        user.image = imageUrl;
    };


    const handleSave = async () => {
        try {
            const res = await fetch(API.PROFILE.UPDATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    name,
                    email,
                }),
            });

            if (!res.ok) {
                throw new Error("更新に失敗しました");
            }

            alert("プロフィールを更新しました");
        } catch (err) {
            alert("エラーが発生しました");
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow text-center">
            {/* プロフィール画像 */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                {user.image ? (
                    <img
                    src={user.image}
                    alt="プロフィール画像"
                    className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <UserIcon className="text-gray-500 w-16 h-16" />
                )}

                {/* カメラアイコンをフチの上に重ねる */}
                <div
                    className="absolute -bottom-0 -right-0 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center border"
                    onClick={handleImageClick}
                >
                    <Camera size={16} />
                </div>
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </div>

            {/* ユーザー情報 */}
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">
                {user.createdAt &&
                `${user.createdAt.getFullYear()}年${user.createdAt.getMonth() + 1}月から利用開始`}
            </p>

            {/* 入力フォーム */}
            <div className="mt-6 text-left">
                <div className="mb-4">
                    <label className="block mb-1 text-sm">表示名</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm">メールアドレス</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                    保存する
                </button>
            </div>
        </div>
    );
}
