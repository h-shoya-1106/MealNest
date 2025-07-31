"use client";

import { Bell, Palette, Lock, LogOut, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export default function SettingClient({ user }: Props) {
  return (
    <div className="space-y-6">
      {/* 通知設定 */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Bell className="text-muted-foreground" />
            <div>
              <div className="font-semibold">通知設定</div>
              <div className="text-sm text-muted-foreground">
                お知らせや通知の設定
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Pencil size={18} />
          </Button>
        </CardContent>
      </Card>

      {/* テーマカラー */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Palette className="text-muted-foreground" />
            <div>
              <div className="font-semibold">テーマカラー</div>
              <div className="text-sm text-muted-foreground">
                アプリの配色設定
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Pencil size={18} />
          </Button>
        </CardContent>
      </Card>

      {/* アカウント管理 */}
      <div className="p-4 border rounded-xl">
        <div className="mb-4 text-sm font-medium text-gray-700">アカウント管理</div>
        <div className="flex items-center gap-3 mb-3">
          <Lock size={18} className="text-muted-foreground" />
          <span className="text-sm">パスワード変更</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-red-600">
          <LogOut size={18} />
          <span className="text-sm">ログアウト</span>
        </div>
      </div>
    </div>
  );
}
