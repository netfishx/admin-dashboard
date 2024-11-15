"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import { DateRangeFilter } from "@/components/daterange-filter";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("report.recharge");
  const [id, setId] = useQueryState("userId");
  const [userId, setUserId] = useQueryState("userId");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-between items-center bg-background py-2 px-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("finishTime")}</Label>
          <DateRangeFilter quickSetBtn={[]} enableTimeSelect={false} />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("orderNo")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={id ?? ""}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center float-right p-2">
        <Button variant="outline">{t("reset")}</Button>
        <Button
          onClick={() => {
            startTransition(router.refresh);
          }}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
