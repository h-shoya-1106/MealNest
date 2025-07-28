import { requireLogin } from "@/lib/requireLogin";
import StatsClient from "../../../features/mypage/Stats/StatsClient";
import { fetchStats } from "@/lib/mypage/Stats/fetchStats";

export default async function StatsPage() {
        const session = await requireLogin();
        const userId = Number(session.user.id);
        const [menuCount, favorite, continuousDays, materialCount, menuRankingList] = await fetchStats(userId);
    return <StatsClient menuCount={menuCount} favorite={favorite} continuousDays={continuousDays} materialCount={materialCount} menuRankingList={menuRankingList} />;
}
