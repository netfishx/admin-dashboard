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
import {} from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("report.withdraw");
  const [orderNo, setOrderNo] = useQueryState("orderNo");
  const router = useRouter();
  const [isPending, startSearch] = useTransition();
  const [isReset, startReset] = useTransition();

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const [requestStatus, setRequestStatus] = useQueryState("requestStatus", {
    defaultValue: "all",
  });
  const [withdrawMoney, setWithdrawMoney] = useQueryState("withdrawMoney", {
    defaultValue: "0",
  });
  const [operatorSymbol, setOperatorSymbol] = useQueryState("operatorSymbol", {
    defaultValue: "3",
  });

  const handleFilterChange = (filterType: string) => {
    setOperatorSymbol(filterType);
  };
  const handleAmountChange = (value: string) => {
    // 转换为数字并确保不小于0
    const numberValue = Math.max(0, Number(value));
    setWithdrawMoney(numberValue.toString());
  };
  const [userId, setUserId] = useQueryState("userId");
  const [userType, setUserType] = useQueryState("userType", {
    defaultValue: "all",
  });

  function search() {
    if ((dateRange.startTime && dateRange.endTime) || orderNo) {
      startSearch(router.refresh);
    } else {
      toast.error(t("selectDateOrId"));
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-background px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("finishTime")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("orderNo")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={orderNo ?? ""}
            onChange={(e) => setOrderNo(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("status")}</Label>
          <Select
            value={requestStatus ?? ""}
            onValueChange={(value) => setRequestStatus(value)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="0">{t("auditing")}</SelectItem>
              <SelectItem value="1">{t("withdrawing")}</SelectItem>
              <SelectItem value="2">{t("failed")}</SelectItem>
              <SelectItem value="3">{t("success")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("withdrawMoneyFilter")}</Label>
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
            value={withdrawMoney}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={t("placeholder")}
          />
        </div>
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(() => {
              router.replace("/reports/withdraw");
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
