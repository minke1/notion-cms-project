import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardSummary } from "@/types/dividend";
import { formatUSD, formatKRW } from "@/lib/dividend-utils";
import { DollarSign, Banknote, BarChart3, TrendingUp } from "lucide-react";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: "총 배당금 (USD)",
      value: formatUSD(summary.totalUSD),
      icon: DollarSign,
      description: "연간 총 배당 수익",
    },
    {
      title: "원화 환산",
      value: formatKRW(summary.totalKRW),
      icon: Banknote,
      description: "환율 적용 금액",
    },
    {
      title: "보유 종목",
      value: `${summary.stockCount}개`,
      icon: BarChart3,
      description: "배당금 수령 종목 수",
    },
    {
      title: "배당 횟수",
      value: `${summary.dividendCount}회`,
      icon: TrendingUp,
      description: "연간 배당 지급 횟수",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
