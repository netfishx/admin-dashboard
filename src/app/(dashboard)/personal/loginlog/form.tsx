"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { endOfDay } from "date-fns";
import { startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("users.agents");
  const [ip, setIp] = useQueryState("ip", { defaultValue: "" });
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();
  const router = useRouter();
  async function handleSearch() {
    router.refresh();
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">登录时间</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">登录IP</Label>
          <Input value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() => {
            startReset(() => {
              router.replace(
                `/personal/loginlog?startTime=${startOfDay(Date.now()).getTime()}&endTime=${endOfDay(Date.now()).getTime()}`,
              );
            });
          }}
        >
          {isReset && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("reset")}
        </Button>
        <Button onClick={() => startTransition(handleSearch)}>
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("search")}
        </Button>
      </div>
    </>
  );
}
