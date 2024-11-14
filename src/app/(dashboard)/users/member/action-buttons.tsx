"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Action() {
  const t = useTranslations("users.members");
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("userInfo")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("ratio")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("increaseCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("decreaseCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("deleteCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("limitSetting")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("rebate")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("loginLog")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("changeLog")}
      </Button>
    </>
  );
}
