"use client";
import {} from "@/components/ui/select";
import type { UserBasicInfo } from "@/lib/types";
import { useTranslations } from "next-intl";

export function Form({ data }: { data: UserBasicInfo }) {
  const t = useTranslations("personal.info");

  return (
    <div className="flex flex-col gap-2 bg-background py-6 px-5">
      <div className="justify-between items-center">{t("userInfo")}</div>
      <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
        <div className="text-muted-foreground text-sm w-[100px] text-right">
          {t("account")}:
        </div>
        <div className="w-[300px]">{data?.userAccount}</div>
      </div>
      <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
        <div className="text-muted-foreground text-sm w-[100px] text-right">
          {t("inviteCode")}:
        </div>
        <div className="w-[300px]">{data?.inviteCode}</div>
      </div>
    </div>
  );
}
