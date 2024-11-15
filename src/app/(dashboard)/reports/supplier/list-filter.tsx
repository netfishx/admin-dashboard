"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export function ListFilter({
  hasSearchPermission,
}: { hasSearchPermission: boolean }) {
  const t = useTranslations("report.supplier");
  const [supplierId, setSupplierId] = useQueryState("supplierId");

  const handleReset = () => {
    setSupplierId("");
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
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
