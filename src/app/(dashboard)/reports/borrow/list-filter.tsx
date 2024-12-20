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

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function ListFilter() {
  const t = useTranslations("report.borrow");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [orderNumber, setOrderNumber] = useQueryState("orderNo", {
    defaultValue: "",
  });
  const [agentId, setAgentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [memberId, setMemberId] = useQueryState("memberId", {
    defaultValue: "",
  });
  const [typeId, setTypeId] = useQueryState("orderType", {
    defaultValue: "all",
  });

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleReset = () => {
    router.replace("/reports/borrow");
  };
  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      {/* First row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{t("dateRange")}</Label>
          <DateRangeFilter enableTimeSelect={true} />
        </div>
      </div>

      {/* Last row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("orderNumber")}</Label>
          <Input
            value={orderNumber ?? ""}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("memberID")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("type")}</Label>
          <Select
            value={typeId ?? ""}
            onValueChange={(value) => setTypeId(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="15">{t("borrow")}</SelectItem>
              <SelectItem value="16">{t("repayment")}</SelectItem>
              <SelectItem value="21">{t("writeOff")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
          {/* <Button disabled={isPending}>{t("download")}</Button> */}
        </div>
      </div>
    </div>
  );
}
