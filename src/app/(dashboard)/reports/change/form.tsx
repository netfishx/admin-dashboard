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
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("report.change");
  const router = useRouter();
  const [isReset, startReset] = useTransition();

  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const [userId, setUserId] = useQueryState("userId");
  const [transactionID, setTransactionID] = useQueryState("transactionID");
  const [userType, setUserType] = useQueryState("userType", {
    defaultValue: "0",
  });
  const [operateCode, setOperateCode] = useQueryState("operateCode", {
    defaultValue: "all",
  });
  const [isPending, startTransition] = useTransition();

  function search() {
    if (!(startTime && endTime) && !transactionID) {
      toast.error(t("selectDateOrId"));
    } else {
      startTransition(router.refresh);
    }
  }
  return (
    <div className="flex flex-col bg-background py-4 px-4 gap-4">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("createdTime")}</Label>
          <DateRangeFilter />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("operateType")}</Label>
          {/* 百家乐代理结算、百家乐会员结算、掼蛋会员结算、返水、充值、提现、借款、还款、授信、减少授信、转出、转入、投注、打赏 */}
          <Select
            onValueChange={(value) => setOperateCode(value)}
            defaultValue="all"
            value={operateCode ?? ""}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">百家乐投注</SelectItem>
              <SelectItem value="3">入金</SelectItem>
              <SelectItem value="4">出金进行中</SelectItem>
              <SelectItem value="5">出金完成</SelectItem>
              <SelectItem value="6">出金退回</SelectItem>
              <SelectItem value="7">创建钱包</SelectItem>
              <SelectItem value="8">发反水</SelectItem>
              <SelectItem value="9">百家乐结算</SelectItem>
              <SelectItem value="10">掼蛋结算</SelectItem>
              <SelectItem value="11">关闭房间</SelectItem>
              <SelectItem value="12">房间充值</SelectItem>
              <SelectItem value="13">领反水</SelectItem>
              <SelectItem value="15">借款</SelectItem>
              <SelectItem value="16">还款</SelectItem>
              <SelectItem value="17">创建房间</SelectItem>
              <SelectItem value="18">提升额度</SelectItem>
              <SelectItem value="19">减少额度</SelectItem>
              <SelectItem value="20">转款</SelectItem>
              <SelectItem value="21">销账</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("transactionId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={transactionID ?? ""}
            onChange={(e) => setTransactionID(e.target.value)}
          />
        </div>
        {/* todo admin permission */}
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userType")}</Label>
          <Select
            value={userType ?? ""}
            onValueChange={(value) => setUserType(value)}
            defaultValue="0"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">{t("all")}</SelectItem> */}
              <SelectItem value="0">{t("agent")}</SelectItem>
              <SelectItem value="2">{t("member")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* todo admin permission */}
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
                `/reports/change?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
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
