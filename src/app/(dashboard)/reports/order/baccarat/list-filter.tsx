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
import { makeDownload } from "@/lib/utils";
import { orderListBaccaratAgentIdAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
export function ListFilter({ gameList }: { gameList: GameInfo[] }) {
  const t = useTranslations("report.orderlist");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startSearch] = useTransition();
  const [isReset, startReset] = useTransition();
  const [isDownload, startDownload] = useTransition();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const [gameName, setGameName] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [bettingtime, setBettingtime] = useQueryState(
    "timeType",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: false }),
  );
  // 代理结算状态
  const [settlementstatus, setSettlementstatus] = useQueryState("orderStatus", {
    defaultValue: "all",
  });
  // 订单号
  const [ordernumber, setOrdernumber] = useQueryState("id", {
    defaultValue: "",
  });
  // 期号
  const [issuenumber, setIssuenumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });
  // 部长
  const [ministerID, setMinisterID] = useQueryState("minister", {
    defaultValue: "",
  });
  // 会员
  const [memberID, setMemberID] = useQueryState("memberId", {
    defaultValue: "",
  });
  // 房主
  const [roomeownerID, setRoomeownerID] = useQueryState("roomOwnerId", {
    defaultValue: "",
  });
  // 末级代理ID
  const [leastlevelID, setLeastlevelID] = useQueryState("lastAgentId", {
    defaultValue: "",
  });
  // 代理ID
  const [, setOrderListBaccaratAgentId] = useAtom(orderListBaccaratAgentIdAtom);
  const [rechargeMoney, setRechargeMoney] = useQueryState(
    "betAmount",
    parseAsString.withDefault("0").withOptions({ clearOnDefault: false }),
  );
  const [operatorSymbol, setOperatorSymbol] = useQueryState(
    "operators",
    parseAsString.withDefault("0").withOptions({ clearOnDefault: false }),
  );

  const [agentId, setAgentId] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOperatorSymbol("0");
    setRechargeMoney("0");
  }, []);

  const handleFilterChange = (filterType: string) => {
    setOperatorSymbol(filterType);
  };

  const handleAmountChange = (value: string) => {
    // 转换为数字并确保不小于0
    const numberValue = Math.max(0, Number(value));
    setRechargeMoney(numberValue.toString());
  };

  const handleAgentIdChange = (value: string) => {
    setAgentId(value);
  };

  const handleReset = () => {
    startReset(() => {
      router.replace("/reports/order/baccarat");
    });
  };

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      setOrderListBaccaratAgentId(agentId);
      startSearch(router.refresh);
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Select
            value={bettingtime ?? ""}
            onValueChange={(value) => setBettingtime(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t("bettingtime")}</SelectItem>
              <SelectItem value="0">{t("statisticsTime")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DateRangeFilter enableTimeSelect={false} />
      </div>

      {/* 第二行 */}
      <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("ordernumber")}</Label>
          <Input
            value={ordernumber ?? ""}
            onChange={(e) => setOrdernumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gamename")}</Label>
          <Select
            value={gameName ?? ""}
            onValueChange={(value) => setGameName(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                {t("all")}
              </SelectItem>
              {gameList.map((game) => (
                <SelectItem key={game.gameId} value={game.gameId.toString()}>
                  {game.gameName}
                </SelectItem>
              ))}
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

        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("memberID")}</Label>
          <Input
            value={memberID ?? ""}
            onChange={(e) => setMemberID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("roomeownerID")}</Label>
          <Input
            value={roomeownerID ?? ""}
            onChange={(e) => setRoomeownerID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("ministerID")}</Label>
          <Input
            value={ministerID ?? ""}
            onChange={(e) => setMinisterID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("leastlevelID")}</Label>
          <Input
            value={leastlevelID ?? ""}
            onChange={(e) => setLeastlevelID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("amountfilter")}</Label>
          <Select
            onValueChange={(value) => handleFilterChange(value)}
            defaultValue={operatorSymbol}
            value={operatorSymbol}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">&gt;=</SelectItem>
              <SelectItem value="1">&lt;=</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            min={0}
            value={rechargeMoney}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={t("placeholderselect")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("settlementstatus")}</Label>
          <Select
            value={settlementstatus ?? ""}
            onValueChange={(value) => setSettlementstatus(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">{t("notSettled")}</SelectItem>
              <SelectItem value="2">{t("settled")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => handleAgentIdChange(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* 第四行 */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button variant="outline" disabled={isReset} onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
          <Button
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100005))
            }
            disabled={isDownload}
          >
            {isDownload && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
