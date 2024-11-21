"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("chart");

  const chartData = data.map(({ game, data }) => ({
    game,
    data,
  }));

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
                          {chartData.reduce((acc, curr) => acc + curr.data, 0)}
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
