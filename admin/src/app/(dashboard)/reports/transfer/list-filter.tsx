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
  hasTransferTypePermission,
}: {
  hasTransferTypePermission: boolean;
}) {
  const t = useTranslations("report.transfer");
  const router = useTransitionRouter();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });
  const [orderNumber, setOrderNumber] = useQueryState("transactionID", {
    defaultValue: "",
  });
  const [agentId, setAgentId] = useQueryState("senderAgentId", {
    defaultValue: "",
  });
  const [memberId, setMemberId] = useQueryState("recipientAgentId", {
    defaultValue: "",
  });
  const [typeId, setTypeId] = useQueryState("operateCode", {
    defaultValue: "all",
  });
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    router.replace("/reports/transfer");
  };
  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => {
        router.refresh();
      });
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="bg-background flex flex-col gap-2 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{t("dateRange")}</Label>
          <DateRangeFilter enableTimeSelect={true} />
        </div>
      </div>

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
          <Label className="shrink-0">{t("senderAgentId")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
            className="w-52"
            disabled={typeId === "-1"}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("recipientAgentId")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
            className="w-52"
            disabled={typeId === "1"}
          />
        </div>
        {hasTransferTypePermission && (
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
                <SelectItem value="-1">{t("transferOut")}</SelectItem>
                <SelectItem value="1">{t("transferIn")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button disabled={isPending} onClick={handleSearch}>
            {isPending && <Loader2 className="animate-spin" />}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
