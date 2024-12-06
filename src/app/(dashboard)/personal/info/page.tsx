import { getUserBasicInfo } from "@/api";
import { getSession } from "@/session";
import { useTranslations } from "next-intl";
import { Suspense, use } from "react";
import { Detail } from "./detail";

function CommonWrapper() {
  const { data } = use(getUserBasicInfo());
  return <Detail data={data} />;
}

export default function Page() {
  const session = use(getSession());
  const t = useTranslations("personal.info");
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex flex-col gap-2 bg-background py-6 px-5">
        <div className="justify-between items-center">{t("userInfo")}</div>
        <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
          <div className="text-muted-foreground text-sm w-[100px] text-right">
            {t("account")}:
          </div>
          <div className="w-[300px] text-sm">{session?.username}</div>
        </div>
        <div className="flex items-center justify-center gap-2 pl-20 w-[300px]">
          <div className="text-muted-foreground text-sm w-[100px] text-right">
            {t("inviteCode")}:
          </div>
          <div className="w-[300px] text-sm">{session?.inviteCode}</div>
        </div>
      </div>
      <Suspense fallback={<Detail />}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
