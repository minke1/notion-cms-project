import { Suspense } from "react";
import { getAllDashboardData } from "@/lib/data-service";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";

// 서버 컴포넌트에서 데이터 페칭
async function DashboardLoader() {
  const { dividends } = await getAllDashboardData();

  return <DashboardContent dividends={dividends} />;
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      {/* async-suspense-boundaries: Suspense로 점진적 렌더링 */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardLoader />
      </Suspense>
    </main>
  );
}
