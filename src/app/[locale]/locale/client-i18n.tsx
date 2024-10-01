"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangeLocale, useI18n, useScopedI18n } from "@/locales/client";

export function ClientI18n() {
  const t = useI18n();
  const t2 = useScopedI18n("hello");
  const changeLocale = useChangeLocale();
  return (
    <Card>
      <CardHeader>
        <CardTitle>client i18n</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("hello")}</p>
        <p>{t("welcome", { name: "006" })}</p>
        <p>{t2("world")}</p>
        <p className="flex gap-2">
          <Button onClick={() => changeLocale("zh")}>中文</Button>
          <Button onClick={() => changeLocale("en")}>英文</Button>
        </p>
      </CardContent>
    </Card>
  );
}
