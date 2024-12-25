"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addMonths, endOfDay, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("system.announcement");
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();

  const router = useRouter();
  const today = new Date();
  const startTime = startOfDay(today);
  const endTime = endOfDay(addMonths(today, 1));

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const [userId, setAgentId] = useQueryState("userId", {
    defaultValue: "",
  });

  function search() {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(router.refresh);
    } else {
      toast.error(t("selectDateRange"));
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <div className="bg-background p-4">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Label className="shrink-0">{t("endTime")}</Label>
                <DateRangeFilter quickSetBtn={[]} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="shrink-0">{t("userId")}</Label>
                <Input
                  placeholder={t("placeholder")}
                  value={userId ?? ""}
                  onChange={(e) => setAgentId(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="float-right flex items-center gap-2">
            <Button
              variant="outline"
              disabled={isReset}
              onClick={() => {
                startReset(() => {
                  router.replace(
                    `/system/announcement/platform?startTime=${startTime.getTime()}&endTime=${endTime.getTime()}`,
                  );
                });
              }}
            >
              {isReset && <Loader2 className="animate-spin" />}
              {t("reset")}
            </Button>
            <Button onClick={search} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : null}
              {t("search")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
