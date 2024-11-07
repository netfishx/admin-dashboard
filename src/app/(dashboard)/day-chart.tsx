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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  bjl01: {
    label: "Chrome",
    color: "hsl(var(--chart-sky))",
  },
  bjl02: {
    label: "Safari",
    color: "hsl(var(--chart-blue))",
  },
  bjl03: {
    label: "Firefox",
    color: "hsl(var(--chart-cyan))",
  },
} satisfies ChartConfig;

export function DayChart({ title }: { title: string }) {
  const t = useTranslations("chart");
  const chartData = [
    { browser: `${t("bjl01")}`, visitors: 275, fill: "var(--color-bjl01)" },
    { browser: `${t("bjl02")}`, visitors: 200, fill: "var(--color-bjl02)" },
    { browser: `${t("bjl03")}`, visitors: 287, fill: "var(--color-bjl03)" },
  ];
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
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
                          {t("bettingAmount")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-foreground text-base"
                        >
                          {chartData.reduce(
                            (acc, curr) => acc + curr.visitors,
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
      </div>
    </div>
  );
}
