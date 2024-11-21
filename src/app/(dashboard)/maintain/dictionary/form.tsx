"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export function Form() {
  const t = useTranslations("maintain.dictionary");
  const router = useRouter();
  const [dictName, setDictName] = useQueryState("dictName", {
    defaultValue: "",
  });
  const [dictCode, setDictCode] = useQueryState("dictCode", {
    defaultValue: "",
  });
  return (
    <div className="flex justify-between items-center bg-background py-2 px-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("dictName")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={dictName ?? ""}
            onChange={(e) => setDictName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("dictCode")}</Label>
          <Input
            placeholder={t("placeholder")}
            value={dictCode ?? ""}
            onChange={(e) => setDictCode(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline">{t("reset")}</Button>
        <Button onClick={() => router.refresh()}>{t("search")}</Button>
      </div>
    </div>
  );
}
