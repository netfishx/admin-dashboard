"use client";

import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
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

  return (
    <div className="flex flex-col gap-2  bg-background py-2 px-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("createTime")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("userId")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={userId ?? ""}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("id")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={id ?? ""}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end items-start">
        <Button variant="outline">{translations("reset")}</Button>
        <Button onClick={() => router.refresh()}>
          {translations("search")}
        </Button>
      </div>
    </div>
  );
}
