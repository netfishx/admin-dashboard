"use client";

import { Button } from "@/components/ui/button";
import type { MemberList } from "@/lib/types";
import { useTranslations } from "next-intl";

export default function Action({ data }: { data: MemberList }) {
  const t = useTranslations("users.members");
  return (
    <>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("userInfo")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("ratio")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("increaseCredit")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("decreaseCredit")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("deleteCredit")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("limitSetting")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("rebate")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("loginLog")}
      </Button>

      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("changeLog")}
      </Button>
    </>
  );
}
