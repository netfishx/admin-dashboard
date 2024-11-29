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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useRef } from "react";

export function ListFilter() {
  const t = useTranslations("report.borrow");
  const router = useRouter();
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

  const dateRangeFilterReset = useRef<
    ((start: number, end: number) => void) | null
  >(null);
  const handleDateRangeFilterReset = () => {
    const start = startOfDay(new Date()).getTime();
    const end = endOfDay(new Date()).getTime();
    dateRangeFilterReset.current?.(start, end);
  };

  const handleReset = () => {
    setOrderNumber("");
    setAgentId("");
    setMemberId("");
    setTypeId("all");
    handleDateRangeFilterReset();
  };
  const handleSearch = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>{t("dateRange")}</Label>
          <DateRangeFilter
            enableTimeSelect={false}
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
          />
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
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("memberID")}</Label>
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
              <SelectItem value="15">{t("borrow")}</SelectItem>
              <SelectItem value="16">{t("repayment")}</SelectItem>
              <SelectItem value="21">{t("writeOff")}</SelectItem>
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
          <Button onClick={handleSearch}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
