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

const chartData = [
  { browser: "掼蛋", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "视讯类", visitors: 200, fill: "var(--color-safari)" },
  { browser: "弹珠类", visitors: 287, fill: "var(--color-firefox)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#249EFF",
  },
  safari: {
    label: "Safari",
    color: "#313CA9",
  },
  firefox: {
    label: "Firefox",
    color: "#21CCFF",
  },
} satisfies ChartConfig;

export default function DayChart() {
  const t = useTranslations();
  return (
    <div className="flex flex-col w-1/2 p-5 rounded border bg-card">
      <div className="flex items-center justify-between">
        <div className="items-center pb-0 flex justify-between">
          <div>{t("todayCashflow")}</div>
        </div>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[230px] w-full"
        >
          <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              outerRadius={80}
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
