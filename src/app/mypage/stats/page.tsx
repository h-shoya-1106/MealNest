import { requireLogin } from "@/lib/requireLogin";
import StatsClient from "../../../features/mypage/Stats/StatsClient";
import { fetchStats } from "@/lib/mypage/Stats/fetchStats";

export default async function StatsPage() {
        const session = await requireLogin();
        const userId = Number(session.user.id);
        const stats = await fetchStats(userId);
    return (
        <StatsClient {...stats}/>
    );
}
