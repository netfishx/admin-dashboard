"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
// 定义配置对象
const chartConfigs = {
  "0": {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  },
  "1": {
    value: {
      label: "Value",
      color: "hsl(var(--chart-4))",
    },
  },
} as const;

export function WeekChart({
  chartConfig,
}: {
  chartConfig: {
    data: {
      mainData?: {
        name: string;
        data: number;
      }[];
      subData?: {
        name: string;
        data: number;
      }[];
    };
    title: string;
    tab: string[];
    type: string;
  };
}) {
  const t = useTranslations("chart");
  const [activeTab, setActiveTab] = useState("0");
  function getData(tab: string) {
    let initialData: {
      name: string;
      data: number;
    }[] = [];

    if (tab === "0") {
      initialData = chartConfig.data.mainData || [];
    } else {
      initialData = chartConfig.data.subData || [];
    }
    return initialData;
  }
  const [data, setData] = useState<
    {
      name: string;
      data: number;
    }[]
  >(getData(activeTab));
  function formatTooltipLabel(label: string) {
    const labelText = chartConfig.tab[Number(activeTab)];
    return `${label} ${labelText}`;
  }
  function formatTooltipValue(value: number) {
    return [`${value}`];
  }

  const onTabChange = (value: string) => {
    setActiveTab(value);
    setData(getData(value));
  };
  return (
    <div className="flex-1 flex flex-col pt-2">
      <div className="flex items-center justify-between">
        <div className="pb-2">
          {chartConfig.title}
          <span className="text-sm text-muted-foreground">
            {t("lastSevenDays")}
          </span>
        </div>
        <div>
          <Tabs
            defaultValue="0"
            className="px-2"
            value={activeTab}
            onValueChange={(value) => onTabChange(value)}
          >
            <TabsList>
              <TabsTrigger value="0">{chartConfig.tab[0]}</TabsTrigger>
              <TabsTrigger value="1">{chartConfig.tab[1]}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfigs[activeTab as keyof typeof chartConfigs]}
          className="w-[40dvw] lg:w-[50dvw] xl:w-[55dvw] 2xl:w-[60dvw] mx-auto h-60"
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
