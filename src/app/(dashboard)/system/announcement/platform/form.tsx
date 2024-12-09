"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { endOfDay, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function Form() {
  const t = useTranslations("system.announcement");
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();

  const router = useRouter();

  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const [userId, setAgentId] = useQueryState("userId", {
    defaultValue: "",
  });

  function search() {
    if (!startTime || !endTime) {
      toast.error(t("selectDateRange"));
    } else {
      startTransition(router.refresh);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-background">
          <div className="flex justify-between items-center  py-2 px-4">
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("endTime")}</Label>
                <DateRangeFilter quickSetBtn={[]} />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="shrink-0">{t("userId")}</Label>
                <Input
                  placeholder={t("placeholder")}
                  value={userId ?? ""}
                  onChange={(e) => setAgentId(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center float-right p-2">
            <Button
              variant="outline"
              disabled={isReset}
              onClick={() => {
                startReset(() => {
                  router.replace(
                    `/system/announcement/platform?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
                  );
                });
              }}
            >
              {isReset && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("reset")}
            </Button>
            <Button onClick={search} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t("search")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
