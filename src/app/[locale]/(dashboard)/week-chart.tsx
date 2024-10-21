"use client";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line, 
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";

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
  line1: {
    label: 'Value',
    color: 'hsl(var(--chart-line1))',
  },
  line2: {
    label: 'Value',
    color: 'hsl(var(--chart-line2))',
  },
  line3: {
    label: 'Value',
    color: 'hsl(var(--chart-line3))',
  },
} satisfies ChartConfig;


export default function WeekChart() {
  const t = useTranslations("chart");
  function formatTooltipLabel(label: string) {
    return `${label} ${t("totalDeposits")}`
  }
  function formatTooltipValue(value: any) {
    return [`${value}`]
  }

  return (
    <div className="w-full">
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
      <ChartContainer config={chartConfig} className="h-[calc(100dvh-590px)] aspect-[32/9] mx-auto">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-line1)" />
              <stop offset="50%" stopColor="var(--color-line2)" />
              <stop offset="100%" stopColor="var(--color-line3)" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} />
          <YAxis axisLine={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
            formatter={formatTooltipValue}
            labelFormatter={formatTooltipLabel}
           />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="data" stroke="url(#colorGradient)" strokeWidth={4} activeDot={{ r: 8 }} dot={false} />
          </LineChart>
          </ChartContainer>
    </div>
  );
}
