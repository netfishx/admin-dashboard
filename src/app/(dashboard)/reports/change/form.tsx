"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHANGE_TYPE, USER_TYPE } from "@/lib/dict";
import { Loader2 } from "lucide-react";

import { DateRangeFilter } from "@/components/daterange-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form({ hasAdminPermission }: { hasAdminPermission: boolean }) {
  const t = useTranslations("report.change");
  const router = useRouter();
  const [isReset, startReset] = useTransition();

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [transactionID, setTransactionID] = useQueryState("transactionID");
  const [userType, setUserType] = useQueryState("userType", {
    defaultValue: "0",
  });
  const [operateCode, setOperateCode] = useQueryState("operateCode", {
    defaultValue: "all",
  });
  const [isPending, startSearch] = useTransition();

  function search() {
    if ((dateRange.startTime && dateRange.endTime) || transactionID) {
      startSearch(router.refresh);
    } else {
      toast.error(t("selectDateOrId"));
    }
  }
  return (
    <div className="bg-background flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("createdTime")}</Label>
          <DateRangeFilter />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("operateType")}</Label>
          {/* 百家乐代理结算、百家乐会员结算、掼蛋会员结算、返水、充值、提现、借款、还款、授信、减少授信、转出、转入、投注、打赏 */}
          <Select
            onValueChange={(value) => setOperateCode(value)}
            value={operateCode ?? ""}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              {CHANGE_TYPE.map((item) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {t(item.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("transactionId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={transactionID ?? ""}
            onChange={(e) => setTransactionID(e.target.value)}
          />
        </div>
        {hasAdminPermission && (
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
                {USER_TYPE.map((item) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {t(item.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {hasAdminPermission && (
          <div className="flex items-center gap-2">
            <Label className="shrink-0">{t("userId")}</Label>
            <Input
              placeholder={t("placeholder")}
              className="w-52"
              value={userId ?? ""}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex items-start justify-end gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(async () => {
              router.push("/reports/change");
            });
          }}
        >
          {isReset ? <Loader2 className="animate-spin" /> : null}
          {t("reset")}
        </Button>
        <Button onClick={search} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
