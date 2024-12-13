"use client";

import type { AnnouncementList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Announcement({
  data,
  permissions,
}: {
  data: { list: AnnouncementList[] };
  permissions: string[];
}) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <>
      <div className="relative flex-1 rounded bg-background p-4">
        <div className="mb-4 flex justify-between">
          <div>{t("announcement")}</div>
          <button
            type="button"
            className="text-sm text-primary"
            onClick={() => {
              router.push("/system/announcement/own");
            }}
          >
            {data?.list?.length > 0 && t("more")}
          </button>
        </div>
        <div className="flex w-full flex-col gap-2 text-sm">
          {data && data.list.length > 0 ? (
            data?.list.map((item) => {
              return (
                <div
                  key={item.id}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground"
                >
                  {!permissions?.includes("admin_stat") && (
                    <>
                      {item.type === 1 && (
                        <span className="mr-2 inline-block rounded-sm bg-primary/10 px-2 py-1 text-primary">
                          {t("platform")}
                        </span>
                      )}
                      {item.type === 3 && (
                        <span className="mr-2 inline-block rounded-sm bg-orange/10 px-2 py-1 text-orange">
                          {t("agent")}
                        </span>
                      )}
                    </>
                  )}
                  {item.contentOfLanguage}
                </div>
              );
            })
          ) : (
            <div className="h-20 lg:h-48 xl:h-72">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                {t("noData")}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
