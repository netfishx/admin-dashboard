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
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("report.change");
  const router = useRouter();

  const [userId, setUserId] = useQueryState("userId");
  const [transactionId, setTransactionId] = useQueryState("transactionId");
  const [userType, setUserType] = useQueryState("userType", {
    defaultValue: "all",
  });
  const [operateCode, setOperateCode] = useQueryState("operateCode", {
    defaultValue: "all",
  });
  const [isPending, startTransition] = useTransition();

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
            value={operateCode}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="0">百家乐代理结算</SelectItem>
              <SelectItem value="1">百家乐会员结算</SelectItem>
              <SelectItem value="2">掼蛋会员结算</SelectItem>
              <SelectItem value="3">返水</SelectItem>
              <SelectItem value="4">充值</SelectItem>
              <SelectItem value="5">提现</SelectItem>
              <SelectItem value="6">借款</SelectItem>
              <SelectItem value="7">还款</SelectItem>
              <SelectItem value="8">授信</SelectItem>
              <SelectItem value="9">减少授信</SelectItem>
              <SelectItem value="10">转出</SelectItem>
              <SelectItem value="11">转入</SelectItem>
              <SelectItem value="12">投注</SelectItem>
              <SelectItem value="13">打赏</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("transactionId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={transactionId ?? ""}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>
        {/* todo admin permission */}
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
              <SelectItem value="1">代理</SelectItem>
              <SelectItem value="2">会员</SelectItem>
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
        <Button variant="outline">{t("reset")}</Button>
        <Button
          onClick={() => {
            startTransition(router.refresh);
          }}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
