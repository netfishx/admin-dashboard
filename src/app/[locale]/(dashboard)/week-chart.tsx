"use client";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "21/10",
    data: 4000,
  },
  {
    name: "22/10",
    data: 32000,
  },
  {
    name: "23/10",
    data: 20000,
  },
  {
    name: "24/10",
    data: 42780,
  },
  {
    name: "25/10",
    data: 1890,
  },
  {
    name: "26/10",
    data: 52390,
  },
  {
    name: "27/10",
    data: 3490,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function WeekChart() {
  const t = useTranslations();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="pb-2">
          {t("dataTrending")}
          <span className="text-sm text-gray-400">
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
      <ChartContainer
        config={chartConfig}
        className="h-[calc(100dvh-590px)] w-full"
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
          <Tooltip />
          <CartesianGrid strokeDasharray="3" />
          <Line
            type="natural"
            dataKey="data"
            stroke="#117EFF"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
