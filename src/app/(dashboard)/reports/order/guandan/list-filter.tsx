"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { ReportDownloadBtn } from "@/components/report-download-btn";
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
import type { GameInfo } from "@/lib/types";
import { makeDownload } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function ListFilter({
  hasSearchPermission,
  gameList,
}: {
  hasSearchPermission: boolean;
  gameList: GameInfo[];
}) {
  const t = useTranslations("report.orderlist");
  const [isSearch, startSearch] = useTransition();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });
  const searchParams = useSearchParams();
  // 期号
  const [issuenumber, setIssuenumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });
  // 部长
  const [ministerID, setMinisterID] = useQueryState("minister", {
    defaultValue: "",
  });
  // 代理
  const [agentID, setAgentID] = useQueryState("agentId", {
    defaultValue: "",
  });

  const router = useRouter();
  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      router.refresh();
    } else {
      toast.error(t("selectDateRange"));
    }
  };
  const handleReset = () => {
    router.replace("/reports/order/guandan");
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      {/* 第一行 */}
      <div className="flex items-center gap-4">
        <DateRangeFilter />
      </div>

      {/* 第二行 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("gameType")}</Label>
          <Select disabled defaultValue="1">
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t("qipai")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("gamename")}</Label>
          <Select disabled defaultValue="1">
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{gameList?.[0]?.gameName}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("issuenumber")}</Label>
          <Input
            value={issuenumber ?? ""}
            onChange={(e) => setIssuenumber(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>

        {hasSearchPermission && (
          <div className="flex items-center gap-2">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input
              value={agentID ?? ""}
              onChange={(e) => setAgentID(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("ministerID")}</Label>
          <Input
            value={ministerID ?? ""}
            onChange={(e) => setMinisterID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* 第四行 */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <ReportDownloadBtn
            handleDownload={() => makeDownload(searchParams, 100006)}
          />
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button onClick={() => startSearch(handleSearch)} disabled={isSearch}>
            {isSearch && <Loader2 className="animate-spin" />}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
