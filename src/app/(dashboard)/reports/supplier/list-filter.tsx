"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { endOfDay, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
export function ListFilter({
  hasSearchPermission,
}: { hasSearchPermission: boolean }) {
  const t = useTranslations("report.supplier");
  const [isPending, startTransition] = useTransition();
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
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>{t("daterange")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
        {hasSearchPermission && (
          <div className="flex gap-4 items-center">
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
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => router.refresh())}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
