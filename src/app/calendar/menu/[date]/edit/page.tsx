import { requireLogin } from "@/lib/requireLogin";
import MenuFormClient from "../../../../../features/calendar/MenuFormClient"; // クライアント側処理は分離
import { API } from "@/constants/api";

export default async function MenuEditPage() {
  const session = await requireLogin(); // サーバーでセッション取得
  const userId = Number(session.user.id);

  return <MenuFormClient userId={userId} />;
}
