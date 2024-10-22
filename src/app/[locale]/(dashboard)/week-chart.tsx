"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "2024-10-21",
    data: 4000,
  },
  {
    name: "2024-10-22",
    data: 32000,
  },
  {
    name: "2024-10-23",
    data: 20000,
  },
  {
    name: "2024-10-24",
    data: 42780,
  },
  {
    name: "2024-10-25",
    data: 1890,
  },
  {
    name: "2024-10-26",
    data: 52390,
  },
  {
    name: "2024-10-27",
    data: 3490,
  },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-primary))",
  },
} satisfies ChartConfig;

export default function WeekChart() {
  const t = useTranslations("chart");
  function formatTooltipLabel(label: string) {
    return `${label} ${t("totalDeposits")}`;
  }
  function formatTooltipValue(value: any) {
    return [`${value}`];
  }

  return (
    <div className="flex-1 flex flex-col pt-2">
      <div className="flex items-center justify-between">
        <div className="pb-2">
          {t("dataTrending")}
          <span className="text-sm text-muted-foreground">
            （{t("lastSevenDays")}）
          </span>
        </div>
        <div>
          <Tabs defaultValue="account" className="px-2">
            <TabsList>
              <TabsTrigger value="account">{t("cashflow")}</TabsTrigger>
              <TabsTrigger value="password">{t("headcount")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-[40dvw] lg:w-[50dvw] xl:w-[55dvw] 2xl:w-[60dvw] mx-auto h-60 [@media(min-height:800px)]:h-[400px]"
        >
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
              formatter={formatTooltipValue}
              labelFormatter={formatTooltipLabel}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="data"
              stroke="var(--color-value)"
              strokeWidth={4}
              activeDot={{ r: 8 }}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
