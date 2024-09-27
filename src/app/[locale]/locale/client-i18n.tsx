"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangeLocale, useI18n } from "@/locales/client";

export function ClientI18n() {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  return (
    <Card>
      <CardHeader>
        <CardTitle>client i18n</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("hello")}</p>
        <p className="flex gap-2">
          <Button onClick={() => changeLocale("zh")}>中文</Button>
          <Button onClick={() => changeLocale("ja")}>日语</Button>
        </p>
      </CardContent>
    </Card>
  );
}
