"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Label, Legend, Pie, PieChart } from "recharts";
export const description = "A stacked area chart";

export function DayChart({
  title,
  subTitle,
  data,
}: {
  title: string;
  subTitle: string;
  data: { game: string; data: number }[];
}) {
  const t = useTranslations();
  return (
    <div className="bg-card flex flex-col rounded-sm p-4">
      <div>{title}</div>
      <div className="flex items-center justify-center">
        {data.length > 0 ? (
          <ChartContainer
            config={Object.fromEntries(
              data.map(({ game }, i) => [
                game,
                {
                  label: game,
                  fill: `var(--color-${i + 1})`,
                },
              ]),
            )}
            className="h-40 lg:h-48 xl:h-72"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelKey="game" />}
                formatter={(value) => formatNumber(value as number)}
              />
              <Pie
                data={data}
                dataKey="data"
                nameKey="game"
                innerRadius="60%"
                outerRadius="80%"
                strokeWidth={1}
                label={({ payload, ...props }) => {
                  const adjustedY = props.y + 5;
                  return (
                    <text
                      x={props.x}
                      y={adjustedY}
                      cx={props.cx}
                      cy={props.cy}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill={props.fill}
                    >
                      {formatNumber(payload.data)}
                    </text>
                  );
                }}
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
                            {subTitle}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 10}
                            className="fill-foreground text-base"
                          >
                            {formatNumber(
                              data.reduce((acc, curr) => acc + curr.data, 0),
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
        ) : (
          <div className="h-40 lg:h-48 xl:h-72">
            <div className="text-muted-foreground flex h-full items-center justify-center">
              {t("noData")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
