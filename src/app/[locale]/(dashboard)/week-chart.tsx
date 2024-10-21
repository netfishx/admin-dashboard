"use client";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/locales/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
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
  const t = useI18n();
  // 自定义 Tooltip 的组件
  function CustomTooltip({
    active,
    payload,
    label,
  }: { active: { payload: { value: number }[] }; payload: []; label: string }) {
    if (active && payload && payload.length > 0) {
      return (
        <div className="blur-none bg-white p-2">
          <p className="desc">{`${label} ${t("totalDeposits")}`}</p>
          <p className="label">{`${t("thisperiod")}: ${active.payload[0].value}`}</p>
          <p className="intro">{`${t("lastperiod")}: ${active.payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }
  return (
    <div className="w-full h-[220px] m-2">
      <div>
        <div className="flex items-center justify-between">
          <div className="pb-2">
            {t("dataTrending")}{" "}
            <span className="text-sm text-gray-400">
              （{t("lastSevenDays")}）
            </span>
          </div>
          <div>
            <Tabs defaultValue="account" className="">
              <TabsList>
                <TabsTrigger value="account">{t("cashflow")}</TabsTrigger>
                <TabsTrigger value="password">{t("headcount")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#117EFF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6F42FB" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} />
            <YAxis axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" />
            {/* <Tooltip content={CustomTooltip} /> */}
            <Area
              type="monotone"
              dataKey="data"
              stroke="url(#colorUv)"
              fillOpacity={0.08}
              fill="url(#colorUv)"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
