"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
export const description = "A stacked area chart";

export function DayChart({
  title,
  subTitle,
  data,
  chartConfig,
}: {
  title: string;
  subTitle: string;
  data: { game: string; data: number }[];
  chartConfig: ChartConfig;
}) {
  const chartData = data.map(({ game, data }) => ({
    game,
    data,
  }));
  const t = useTranslations();
  return (
    <div className="flex flex-col rounded bg-card p-4">
      <div>{title}</div>
      <div className="flex items-center justify-center">
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-40 lg:h-48 xl:h-72">
            <PieChart>
              <ChartTooltip cursor={true} content={<CustomTooltip />} />
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
                            {chartData.reduce(
                              (acc, curr) => acc + curr.data,
                              0,
                            )}
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
        ) : (
          <div className="h-40 lg:h-48 xl:h-72">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              {t("noData")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    name: ReactNode;
    value: ReactNode;
  }[];
}) => {
  if (!active || payload?.length === 0) {
    return null;
  }
  return (
    <div className="rounded border bg-card p-2 shadow-lg">
      <p className="text-sm">
        <span className="pr-2 text-muted-foreground">{payload?.[0].name}:</span>
        <span className="font-medium">{payload?.[0].value}</span>
      </p>
    </div>
  );
};
