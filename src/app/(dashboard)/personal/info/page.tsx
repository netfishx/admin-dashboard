import { getUserBasicInfo } from "@/api";
import CopyButton from "@/app/(dashboard)/fund/collection/copy-button";
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
      <div className="flex flex-col gap-2 bg-background p-4">
        <div className="text-sm font-medium">{t("userInfo")}</div>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm w-[100px] text-right">
            {t("account")}:
          </div>
          <div className="text-sm flex items-center">
            {session?.username}
            <CopyButton address={session?.username as string} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm w-[100px] text-right">
            {t("inviteCode")}:
          </div>
          <div className="text-sm flex items-center">
            {session?.inviteCode}
            <CopyButton address={session?.inviteCode as string} />
          </div>
        </div>
      </div>
      <Suspense fallback={<Detail />}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
