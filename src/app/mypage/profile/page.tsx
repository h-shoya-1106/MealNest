import { requireLogin } from "@/lib/requireLogin";
import ProfileClient from "../../../features/mypage/Profile/ProfileClient";
import { fetchUser } from "@/lib/user";

export default async function ProfilePage() {
  const session = await requireLogin();

  if (!session?.user?.email) return <div>ログインが必要です</div>;

  const user = await fetchUser(session.user.email);

  return <ProfileClient user={user} />;
}