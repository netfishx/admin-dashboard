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
import { endOfDay, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";
import { approverStatusDict } from "../tools";

export function Form() {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const router = useRouter();

  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const [isReset, startReset] = useTransition();
  const [isPending, startTransition] = useTransition();

  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [parentAccount, setParentAccount] = useQueryState("parentAccount", {
    defaultValue: "",
  });
  const [approverStatus, setApproverStatus] = useQueryState("approverStatus", {
    defaultValue: "all",
  });
  const approverStatusOptions = [
    ...approverStatusDict.map((item) => ({
      value: item.value.toString(),
      label: item.label,
    })),
  ];

  function search() {
    if (startTime && endTime) {
      startTransition(router.refresh);
    } else {
      toast.error(t("selectDate"));
    }
  }
  return (
    <div className="flex flex-col gap-2  bg-background p-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("dateRange")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("auditStatus")}</Label>
          <Select
            defaultValue={approverStatusOptions[0]?.value}
            onValueChange={(value) => setApproverStatus(value)}
            value={approverStatus}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                {t("all")}
              </SelectItem>
              {approverStatusOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
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
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("parentAccount")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={parentAccount ?? ""}
            onChange={(e) => setParentAccount(e.target.value)}
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
                `/withdraw/apply?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
              );
            });
          }}
        >
          {t("reset")}
        </Button>
        <Button onClick={search} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {translations("search")}
        </Button>
      </div>
    </div>
  );
}
