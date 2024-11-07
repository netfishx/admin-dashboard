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

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-primary))",
  },
} satisfies ChartConfig;

export function WeekChart({
  textConfig,
}: {
  textConfig: {
    data: any[] | undefined;
    title: string;
    tab: string[];
  };
}) {
  const t = useTranslations("chart");
  function formatTooltipLabel(label: string) {
    return `${label} ${t("totalDeposits")}`;
  }
  function formatTooltipValue(value: number) {
    return [`${value}`];
  }

  return (
    <div className="flex-1 flex flex-col pt-2">
      <div className="flex items-center justify-between">
        <div className="pb-2">
          {textConfig.title}
          <span className="text-sm text-muted-foreground">
            {t("lastSevenDays")}
          </span>
        </div>
        <div>
          <Tabs defaultValue="account" className="px-2">
            <TabsList>
              <TabsTrigger value="account">{textConfig.tab[0]}</TabsTrigger>
              <TabsTrigger value="password">{textConfig.tab[1]}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-[40dvw] lg:w-[50dvw] xl:w-[55dvw] 2xl:w-[60dvw] mx-auto h-60"
        >
          <LineChart
            data={textConfig.data}
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
