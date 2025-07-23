import { requireLogin } from "@/lib/requireLogin";
import CalendarClient from "../../../features/calendar/components/CalendarClient";

export default async function CalendarPage() {
  const session = await requireLogin(); // ✅ サーバーでセッションチェック
  return <CalendarClient session={session} />;
}
