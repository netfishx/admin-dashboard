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
import { WITHDRAW_STATUS } from "@/lib/dict";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const router = useRouter();

  const [isReset, startReset] = useTransition();
  const [isPending, startTransition] = useTransition();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [parentAccount, setParentAccount] = useQueryState("parentAccount", {
    defaultValue: "",
  });
  const [approverStatus, setApproverStatus] = useQueryState("approverStatus", {
    defaultValue: "all",
  });

  // 审核状态
  const approverStatusOptions = [
    ...WITHDRAW_STATUS.map((item) => ({
      ...item,
      value: item.value.toString(),
      label: t(item.label),
    })),
  ];

  function search() {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(router.refresh);
    } else {
      toast.error(t("selectDate"));
    }
  }
  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("dateRange")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("parentAccount")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={parentAccount ?? ""}
            onChange={(e) => setParentAccount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(() => {
              router.replace("/withdraw/apply");
            });
          }}
        >
          {isReset ? <Loader2 className="animate-spin" /> : null}
          {t("reset")}
        </Button>
        <Button onClick={search} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {translations("search")}
        </Button>
      </div>
    </div>
  );
}
