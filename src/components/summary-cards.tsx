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
      description: `${summary.stockCountUSD}개 종목 / ${summary.dividendCountUSD}회`,
    },
    {
      title: "총 배당금 (KRW)",
      value: formatKRW(summary.totalKRW),
      icon: Banknote,
      description: `${summary.stockCountKRW}개 종목 / ${summary.dividendCountKRW}회`,
    },
    {
      title: "전체 종목",
      value: `${summary.stockCountUSD + summary.stockCountKRW}개`,
      icon: BarChart3,
      description: `USD ${summary.stockCountUSD}개 / KRW ${summary.stockCountKRW}개`,
    },
    {
      title: "전체 배당 횟수",
      value: `${summary.dividendCountUSD + summary.dividendCountKRW}회`,
      icon: TrendingUp,
      description: `USD ${summary.dividendCountUSD}회 / KRW ${summary.dividendCountKRW}회`,
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
