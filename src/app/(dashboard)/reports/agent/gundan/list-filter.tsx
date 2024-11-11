"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export function ListFilter() {
  const t = useTranslations("report.orderlist");
  const [agentId, setAgentId] = useQueryState("agentId");

  const handleReset = () => {
    setAgentId("");
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>结算日期</Label>
          <DateRangeFilter enableTimeSelect />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>
      {/* 第二行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">游戏类型</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="baccarat" />
            <label htmlFor="baccarat">百家乐</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="guandan" />
            <label htmlFor="guandan">掼蛋</label>
          </div>
        </div>
      </div>

      {/* 第四行 */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
