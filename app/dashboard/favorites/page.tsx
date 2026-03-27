import { DashboardShell } from "@/components/layout/dashboard-shell";
import { FavoritesBoard } from "@/components/favorites/favorites-board";
import { getDashboardNav } from "@/lib/dashboard-nav";

export default function DashboardFavoritesPage() {
  return (
    <DashboardShell
      badge="المفضلة"
      title="الأفكار التي حفظتها للمراجعة"
      subtitle="كل فكرة أضفتها إلى المفضلة ستظهر هنا تلقائيًا، مع الحفاظ على نفس تجربة التصفح الأساسية."
      navItems={getDashboardNav("/dashboard/favorites")}
    >
      <FavoritesBoard />
    </DashboardShell>
  );
}
