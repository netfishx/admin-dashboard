"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GameInfo } from "@/lib/types";
import { endOfDay, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useRef } from "react";

export function ListFilter({
  hasSearchPermission,
  gameList,
}: {
  hasSearchPermission: boolean;
  gameList: GameInfo[];
}) {
  const t = useTranslations("report.orderlist");
  // 期号
  const [issuenumber, setIssuenumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });
  // 部长
  const [ministerID, setMinisterID] = useQueryState("minister", {
    defaultValue: "",
  });
  // 代理
  const [agentID, setAgentID] = useQueryState("agentId", {
    defaultValue: "",
  });

  const dateRangeFilterReset = useRef<
    ((start: number, end: number) => void) | null
  >(null);
  const handleDateRangeFilterReset = () => {
    const start = startOfDay(new Date()).getTime();
    const end = endOfDay(new Date()).getTime();
    dateRangeFilterReset.current?.(start, end);
  };

  const amountFilterReset = useRef<(() => void) | null>(null);
  const handleAmountFilterReset = () => {
    amountFilterReset.current?.();
  };

  const handleReset = () => {
    setIssuenumber("");
    setMinisterID("");
    setAgentID("");
    handleAmountFilterReset();
    handleDateRangeFilterReset();
  };

  const router = useRouter();
  const handleSearch = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <DateRangeFilter
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
        />
      </div>

      {/* 第二行 */}
      <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameType")}</Label>
          <Select disabled defaultValue="1">
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t("qipai")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gamename")}</Label>
          <Select disabled defaultValue="1">
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{gameList?.[0]?.gameName}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("issuenumber")}</Label>
          <Input
            value={issuenumber ?? ""}
            onChange={(e) => setIssuenumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>

        {hasSearchPermission && (
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input
              value={agentID ?? ""}
              onChange={(e) => setAgentID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("ministerID")}</Label>
          <Input
            value={ministerID ?? ""}
            onChange={(e) => setMinisterID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
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
          <Button onClick={handleSearch}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
