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
  gd: {
    label: "Chrome",
    color: "hsl(var(--chart-sky))",
  },
  sx: {
    label: "Safari",
    color: "hsl(var(--chart-blue))",
  },
  dz: {
    label: "Firefox",
    color: "hsl(var(--chart-cyan))",
  },
} satisfies ChartConfig;

export default function DayChart(props: any) {
  const t = useTranslations("chart");
  const { title } = props;
  const chartData = [
    { browser: `${t("guandan")}`, visitors: 275, fill: "var(--color-gd)" },
    { browser: `${t("video")}`, visitors: 200, fill: "var(--color-sx)" },
    { browser: `${t("danzhu")}`, visitors: 287, fill: "var(--color-dz)" },
  ];
  return (
    <div className="flex flex-col w-1/2 p-5 rounded bg-card">
      <div className="flex items-center justify-between">
        {title}
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-video h-[230px]"
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
