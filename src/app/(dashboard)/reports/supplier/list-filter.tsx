"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeDownload } from "@/lib/utils";
import { endOfDay, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
export function ListFilter({
  hasSearchPermission,
}: {
  hasSearchPermission: boolean;
}) {
  const t = useTranslations("report.supplier");
  const [isPending, startTransition] = useTransition();
  const [isDownload, startDownload] = useTransition();
  const searchParams = useSearchParams();
  const [supplierId, setSupplierId] = useQueryState("supplierId", {
    defaultValue: "",
  });
  const router = useRouter();

  const handleReset = () => {
    router.replace(
      `/reports/supplier?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-background px-4 py-2">
      {/* First row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{t("daterange")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
        {hasSearchPermission && (
          <div className="flex items-center gap-4">
            <Label className="shrink-0">供应商ID</Label>
            <Input
              value={supplierId ?? ""}
              onChange={(e) => setSupplierId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
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
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => router.refresh())}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
          <Button
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100000))
            }
            disabled={isDownload}
          >
            {isDownload && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
