"use client";
import {} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Form() {
  const t = useTranslations("personal.info");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 bg-background py-6 px-5">
      <div className="justify-between items-center">{t("userInfo")}</div>
      <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
        <div className="text-muted-foreground text-sm w-[100px] text-right">
          {t("account")}:
        </div>
        <div className="">123312</div>
      </div>
      <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
        <div className="text-muted-foreground text-sm w-[100px] text-right">
          {t("inviteCode")}:
        </div>
        <div className="">123312</div>
      </div>
    </div>
  );
}
