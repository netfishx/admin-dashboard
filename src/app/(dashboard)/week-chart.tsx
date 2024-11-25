"use client";
import { getFundList, getTodayWinLossChart } from "@/api";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {} from "@/lib/types";
import { endOfDay, format, fromUnixTime, startOfDay, sub } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
  textConfig,
}: {
  textConfig: {
    data?: {
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
  const [data, setData] = useState<Array<{ name: string; data: number }>>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      await arrangeConfigData();
      setData(getData(activeTab));
    };
    fetchData();
  }, []);

  async function arrangeConfigData() {
    const now = Date.now();
    const start = startOfDay(now).getTime();
    const end = endOfDay(now).getTime();
    const oneWeekAgo = sub(start, { weeks: 1 }).getTime();
    switch (textConfig.type) {
      case "bjl":
      case "gd": {
        const { data: gameChartData } = await getTodayWinLossChart({
          startTime: start,
          endTime: end,
          beforeEndTime: oneWeekAgo,
          size: 6,
        });
        if (textConfig.type === "bjl") {
          // 百家乐流水
          const bjlTrendingBetAmountData: Array<{
            name: string;
            data: number;
          }> = [];
          // 百家乐人次
          const bjlTrendingBetNumData: Array<{ name: string; data: number }> =
            [];

          gameChartData?.dailyBaccaratReport?.forEach(
            ({ day, memberBetAmount, betNum }) => {
              const formattedDay = format(
                fromUnixTime(day / 1000),
                "yyyy-MM-dd",
              );

              bjlTrendingBetAmountData.push({
                name: formattedDay,
                data: Number(memberBetAmount),
              });

              bjlTrendingBetNumData.push({
                name: formattedDay,
                data: Number(betNum),
              });
            },
          );
          textConfig.data = {
            mainData: bjlTrendingBetAmountData,
            subData: bjlTrendingBetNumData,
          };
        } else {
          // 掼蛋流水
          const gdTrendingBetAmountData: Array<{ name: string; data: number }> =
            [];
          // 掼蛋人次
          const gdTrendingBetNumData: Array<{ name: string; data: number }> =
            [];
          gameChartData?.dailyPokerReport?.forEach(
            ({ day, totaSettledAmount, issueAmount }) => {
              const formattedDay = format(
                fromUnixTime(day / 1000),
                "yyyy-MM-dd",
              );

              gdTrendingBetAmountData.push({
                name: formattedDay,
                data: Number(totaSettledAmount),
              });

              gdTrendingBetNumData.push({
                name: formattedDay,
                data: Number(issueAmount),
              });
            },
          );
          textConfig.data = {
            mainData: gdTrendingBetAmountData,
            subData: gdTrendingBetNumData,
          };
        }
        break;
      }
      case "member": {
        break;
      }
      case "fund": {
        // 充提
        const { data: fundListData } = await getFundList({
          startTime: oneWeekAgo,
          endTime: end,
        });
        const rechargeData: Array<{ name: string; data: number }> = [];
        const withdrawData: Array<{ name: string; data: number }> = [];
        fundListData?.fundList?.forEach(
          ({ day, rechargeAmount, withdrawAmount }) => {
            const formattedDay = format(fromUnixTime(day / 1000), "yyyy-MM-dd");
            rechargeData.push({
              name: formattedDay,
              data: Number(rechargeAmount),
            });

            withdrawData.push({
              name: formattedDay,
              data: Number(withdrawAmount),
            });
          },
        );
        textConfig.data = {
          mainData: rechargeData,
          subData: withdrawData,
        };
        break;
      }
      default:
        break;
    }
  }
  function getData(tab: string) {
    if (!textConfig.data) {
      return [];
    }
    console.info("=========", textConfig.data);
    let initialData: {
      name: string;
      data: number;
    }[] = [];
    if (tab === "0") {
      initialData = textConfig.data?.mainData || [];
    } else {
      initialData = textConfig.data?.subData || [];
    }
    return initialData;
  }

  function formatTooltipLabel(label: string) {
    return `${label} ${t("totalDeposits")}`;
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
          {textConfig.title}
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
              <TabsTrigger value="0">{textConfig.tab[0]}</TabsTrigger>
              <TabsTrigger value="1">{textConfig.tab[1]}</TabsTrigger>
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
