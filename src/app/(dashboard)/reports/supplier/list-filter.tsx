"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeDownload } from "@/lib/utils";
import {} from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [isDownload, startDownload] = useTransition();
  const searchParams = useSearchParams();
  const [supplierId, setSupplierId] = useQueryState("supplierId", {
    defaultValue: "",
  });
  const router = useRouter();

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
    <div className="flex flex-col gap-2 bg-background px-4 py-2">
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
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100000))
            }
            disabled={isDownload}
            variant="outline"
          >
            {isDownload && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("download")}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button disabled={isPending} onClick={handleSearch}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
