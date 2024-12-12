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
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function ListFilter() {
  const t = useTranslations("report.transfer");
  const router = useRouter();
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
    router.replace(
      `/reports/transfer?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
    );
  };
  const handleSearch = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>{t("dateRange")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>

      {/* Last row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("orderNumber")}</Label>
          <Input
            value={orderNumber ?? ""}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("senderAgentId")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("recipientAgentId")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-4 items-center">
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
      </div>
      {/* Last row */}
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center ">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button disabled={isPending} onClick={handleSearch}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("search")}
          </Button>
          {/* <Button disabled={isPending}>{t("download")}</Button> */}
        </div>
      </div>
    </div>
  );
}
