"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function Form() {
  const t = useTranslations("maintain.dictionary");
  const [isPending, startTransition] = useTransition();
  const [isReset, startResetTransition] = useTransition();
  const router = useTransitionRouter();
  const [dictName, setDictName] = useQueryState("dictName", {
    defaultValue: "",
  });
  const [dictCode, setDictCode] = useQueryState("dictCode", {
    defaultValue: "",
  });
  return (
    <div className="bg-background flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("dictName")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={dictName ?? ""}
            onChange={(e) => setDictName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("dictCode")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={dictCode ?? ""}
            onChange={(e) => setDictCode(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={isReset}
          onClick={() =>
            startResetTransition(() => router.replace("/maintain/dictionary"))
          }
        >
          {isReset && <Loader2 className="animate-spin" />}
          {t("reset")}
        </Button>
        <Button
          disabled={isPending}
          onClick={() => startTransition(() => router.refresh())}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
