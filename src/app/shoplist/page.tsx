import { requireLogin } from "@/lib/requireLogin";
import ShopListClient from "../../../features/calendar/components/ShopListClient";

export default async function CalendarPage() {
  const session = await requireLogin(); // サーバーでセッションチェック
  return <ShopListClient session={session} />;
}
