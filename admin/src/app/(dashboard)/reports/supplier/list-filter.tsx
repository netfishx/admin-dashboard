"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { ReportDownloadBtn } from "@/components/report-download-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeDownload } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function ListFilter({
  hasSearchPermission,
}: {
  hasSearchPermission: boolean;
}) {
  const t = useTranslations("report.supplier");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [supplierId, setSupplierId] = useQueryState("supplierId", {
    defaultValue: "",
  });
  const router = useTransitionRouter();

  const handleReset = () => {
    router.replace("/reports/supplier");
  };

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="bg-background flex flex-col gap-2 px-4 py-2">
      {/* First row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{t("daterange")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
        {hasSearchPermission && (
          <div className="flex items-center gap-4">
            <Label className="shrink-0">{t("supplierId")}</Label>
            <Input
              value={supplierId ?? ""}
              className="w-52"
              onChange={(e) => setSupplierId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
      </div>

      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <ReportDownloadBtn
            handleDownload={() => makeDownload(searchParams, 100000)}
          />
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
