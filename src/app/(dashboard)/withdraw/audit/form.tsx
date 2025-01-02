"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("withdraw.audit");
  const translations = useTranslations();

  const router = useRouter();
  const [userId, setUserId] = useQueryState("userId", {
    defaultValue: "",
  });
  const [id, setId] = useQueryState("id", {
    defaultValue: "",
  });
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  function search() {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(router.refresh);
    } else {
      toast.error(t("selectDate"));
    }
  }
  return (
    <div className="bg-background flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("createTime")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("id")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={id ?? ""}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(() => {
              router.replace("/withdraw/audit");
            });
          }}
        >
          {isReset ? <Loader2 className="animate-spin" /> : null}
          {t("reset")}
        </Button>
        <Button onClick={search} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {translations("search")}
        </Button>
      </div>
    </div>
  );
}
