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
    <div className="flex h-full w-full flex-col gap-2">
      <div className="bg-background flex flex-col gap-2 p-4">
        <div className="text-sm font-medium">{t("userInfo")}</div>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-[100px] text-right text-sm">
            {t("account")}:
          </div>
          <div className="flex items-center text-sm">
            {session?.username}
            <CopyButton address={session?.username ?? ""} />
          </div>
        </div>
        {session?.inviteCode && (
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground w-[100px] text-right text-sm">
              {t("inviteCode")}:
            </div>
            <div className="flex items-center text-sm">
              {session?.inviteCode}
              <CopyButton address={session?.inviteCode ?? ""} />
            </div>
          </div>
        )}
      </div>
      <Suspense fallback={<Detail />}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
