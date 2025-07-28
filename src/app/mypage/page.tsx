import { requireLogin } from "@/lib/requireLogin";
import MyPageClient from "../../features/mypage/MyPageClient";

export default async function MyPagePage() {
  const session = await requireLogin();
  return <MyPageClient />;
}