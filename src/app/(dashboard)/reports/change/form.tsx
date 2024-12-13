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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
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
    <div className="flex flex-col gap-4 bg-background p-4">
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
            defaultValue="all"
            value={operateCode ?? ""}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">{t("lotteryBet")}</SelectItem>
              <SelectItem value="3">{t("deposit")}</SelectItem>
              <SelectItem value="4">{t("withdrawal")}</SelectItem>
              <SelectItem value="5">{t("withdrawalCompleted")}</SelectItem>
              <SelectItem value="6">{t("withdrawalReturned")}</SelectItem>
              <SelectItem value="7">{t("createWallet")}</SelectItem>
              <SelectItem value="8">{t("issueRebate")}</SelectItem>
              <SelectItem value="9">{t("lotterySettlement")}</SelectItem>
              <SelectItem value="10">{t("guandanSettlement")}</SelectItem>
              <SelectItem value="11">{t("closeRoom")}</SelectItem>
              <SelectItem value="12">{t("roomRecharge")}</SelectItem>
              <SelectItem value="13">{t("receiveRebate")}</SelectItem>
              <SelectItem value="15">{t("borrow")}</SelectItem>
              <SelectItem value="16">{t("repayment")}</SelectItem>
              <SelectItem value="17">{t("createRoom")}</SelectItem>
              <SelectItem value="18">{t("increaseCredit")}</SelectItem>
              <SelectItem value="19">{t("decreaseCredit")}</SelectItem>
              <SelectItem value="20">{t("transfer")}</SelectItem>
              <SelectItem value="21">{t("writeOff")}</SelectItem>
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
        {/* todo admin permission */}
        <div className="flex items-center gap-2">
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
              router.replace("/reports/change");
            });
          }}
        >
          {isReset ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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
