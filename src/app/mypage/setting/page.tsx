import { fetchUser } from "@/lib/user";
import SettingClient from "../../../features/mypage/Setting/SettingClient";
import { requireLogin } from "@/lib/requireLogin";

export default async function SettingPage() {
  const session = await requireLogin();

  if (!session?.user?.email) return <div>ログインが必要です</div>;

  const user = await fetchUser(session.user.email);

  return <SettingClient user={user} />;
}