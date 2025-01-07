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
import { useTransitionRouter } from "next-view-transitions";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function ListFilter({
  hasAdminPermission,
}: {
  hasAdminPermission: boolean;
}) {
  const t = useTranslations("report.credit");
  const router = useTransitionRouter();
  const [isPending, startTransition] = useTransition();
  const [orderNumber, setOrderNumber] = useQueryState("transactionID", {
    defaultValue: "",
  });
  const [agentId, setAgentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [memberId, setMemberId] = useQueryState("memberId", {
    defaultValue: "",
  });
  const [typeId, setTypeId] = useQueryState("operateCode", {
    defaultValue: "all",
  });

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleReset = () => {
    router.replace("/reports/credit");
  };

  const handleSearch = () => {
    if ((dateRange.startTime && dateRange.endTime) || orderNumber) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDateOrId"));
    }
  };

  return (
    <div className="bg-background flex flex-col gap-2 p-4">
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
        {hasAdminPermission && (
          <div className="flex items-center gap-4">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input
              value={agentId ?? ""}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder={t("placeholderinput")}
              className="w-52"
            />
          </div>
        )}
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("memberID")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
            className="w-52"
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
              <SelectItem value="18">{t("addCredit")}</SelectItem>
              <SelectItem value="19">{t("reduceCredit")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t("search")}
          </Button>
          {/* <Button disabled={isPending}>{t("download")}</Button> */}
        </div>
      </div>
    </div>
  );
}
