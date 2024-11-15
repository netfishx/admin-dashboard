"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/select";
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
  const t = useTranslations("report.recharge");
  const [id, setId] = useQueryState("userId");
  const [userId, setUserId] = useQueryState("userId");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userType, setUserType] = useQueryState("userType");
  const [rechargeMoney, setRechargeMoney] = useQueryState("rechargeMoney", {
    defaultValue: "",
  });
  const [operatorSymbol, setOperatorSymbol] = useQueryState("operatorSymbol", {
    defaultValue: "",
  });
  const handleFilterChange = (filterType: string) => {
    setOperatorSymbol(filterType);
  };
  const handleAmountChange = (value: string) => {
    if (operatorSymbol === "") {
      setOperatorSymbol("0");
    } else {
      setRechargeMoney(value);
    }
  };
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
            value={id ?? ""}
            onChange={(e) => setId(e.target.value)}
          />
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
              <SelectItem value="0">&gt;=</SelectItem>
              <SelectItem value="1">&lt;=</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
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
              <SelectItem value="1">代理</SelectItem>
              <SelectItem value="2">会员</SelectItem>
            </SelectContent>
          </Select>
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
