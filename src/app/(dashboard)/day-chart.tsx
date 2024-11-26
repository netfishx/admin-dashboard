"use client";
import { getTodayWinLossChart } from "@/api";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { GameChartConfig, TodayGameReport } from "@/lib/types";
import { endOfDay, startOfDay, sub } from "date-fns";
import { useEffect, useState } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

const chartConfig = {
  bjl01: {
    color: "hsl(var(--chart-1))",
  },
  bjl02: {
    color: "hsl(var(--chart-2))",
  },
  bjl03: {
    color: "hsl(var(--chart-3))",
  },
  bjl04: {
    color: "hsl(var(--chart-4))",
  },
  bjl05: {
    color: "hsl(var(--chart-5))",
  },
  bjl06: {
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function DayChart({
  title,
  subTitle,
  type,
}: {
  title: string;
  subTitle: string;
  type: number;
}) {
  const [data, setData] = useState<GameChartConfig[]>([]);
  const now = Date.now();
  const start = startOfDay(now).getTime();
  const end = endOfDay(now).getTime();
  const oneWeekAgo = sub(start, { weeks: 1 }).getTime();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      const { data: gameChartData } = await getTodayWinLossChart({
        startTime: start,
        endTime: end,
        beforeEndTime: oneWeekAgo,
        size: 6,
      });
      getData(gameChartData as TodayGameReport);
    };

    fetchData();
  }, []);

  const getData = (gameChartData: TodayGameReport) => {
    if (type) {
      // 今日百家乐人次
      const bjlActiveUsersData: GameChartConfig[] = [];
      gameChartData?.agentBaccaratBetNumReport?.forEach(
        ({ gameName, betNum }, index) => {
          const color = Object.values(chartConfig)[index]?.color;
          bjlActiveUsersData.push({
            game: gameName || "",
            data: Number(betNum),
            fill: color,
          });
        },
      );
      setData(bjlActiveUsersData || []);
    } else {
      // 今日百家乐流水
      const bjlBetAmountData: GameChartConfig[] = [];
      gameChartData?.agentBaccaratAmountReport?.forEach(
        ({ gameName, memberBetAmount }, index) => {
          const color = Object.values(chartConfig)[index]?.color;
          bjlBetAmountData.push({
            game: gameName || "",
            data: Number(memberBetAmount),
            fill: color,
          });
        },
      );
      setData(bjlBetAmountData || []);
    }
  };
  return (
    <div className="flex flex-col p-4 rounded bg-card">
      <div>{title}</div>
      <div className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-40 lg:h-48 xl:h-72">
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="data"
              nameKey="game"
              innerRadius="60%"
              outerRadius="80%"
              strokeWidth={1}
              label
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-muted-foreground text-base"
                        >
                          {subTitle}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-foreground text-base"
                        >
                          {data.reduce((acc, curr) => acc + curr.data, 0)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
