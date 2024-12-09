"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { DateRangeFilter } from "@/components/daterange-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("report.recharge");
  const [userId, setUserId] = useQueryState("userId");
  const [orderNo, setOrderNo] = useQueryState("orderNo");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();

  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const [userType, setUserType] = useQueryState("userType", {
    defaultValue: "all",
  });
  const [rechargeMoney, setRechargeMoney] = useQueryState(
    "rechargeMoney",
    parseAsString.withDefault("0").withOptions({ clearOnDefault: false }),
  );
  const [operatorSymbol, setOperatorSymbol] = useQueryState(
    "operatorSymbol",
    parseAsString.withDefault("3").withOptions({ clearOnDefault: false }),
  );
  const handleFilterChange = (filterType: string) => {
    setOperatorSymbol(filterType);
  };
  const handleAmountChange = (value: string) => {
    // 转换为数字并确保不小于0
    const numberValue = Math.max(0, Number(value));
    setRechargeMoney(numberValue.toString());
  };

  function search() {
    if (!(startTime && endTime) && !orderNo) {
      toast.error(t("selectDateOrId"));
    } else {
      startTransition(router.refresh);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOperatorSymbol("3");
    setRechargeMoney("0");
  }, []);
  return (
    <div className="flex flex-col bg-background py-4 px-4 gap-4">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("finishTime")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("orderNo")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={orderNo ?? ""}
            onChange={(e) => setOrderNo(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("rechargeMoneyFilter")}</Label>
          <Select
            onValueChange={(value) => handleFilterChange(value)}
            defaultValue={operatorSymbol}
            value={operatorSymbol}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">&gt;=</SelectItem>
              <SelectItem value="1">&lt;=</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            min={0}
            value={rechargeMoney}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={t("placeholder")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userType")}</Label>
          <Select
            value={userType ?? ""}
            onValueChange={(value) => setUserType(value)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="0">{t("agent")}</SelectItem>
              <SelectItem value="2">{t("member")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end items-start">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(() => {
              router.replace(
                `/reports/recharge?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
              );
            });
          }}
        >
          {t("reset")}
        </Button>
        <Button onClick={search} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
