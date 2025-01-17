"use client";

import type { HomeAnnouncementList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";

export function Announcement({
  data,
  permissions,
}: {
  data: HomeAnnouncementList[];
  permissions: string[];
}) {
  const t = useTranslations();
  const router = useTransitionRouter();

  return (
    <>
      <div className="relative flex-1 rounded-sm bg-background p-4">
        <div className="mb-4 flex justify-between">
          <div>{t("announcement")}</div>
          <button
            type="button"
            className="text-primary text-sm"
            onClick={() => {
              router.push("/system/announcement/own");
            }}
          >
            {data?.length > 0 && t("more")}
          </button>
        </div>
        <div className="flex w-full flex-col gap-2 text-sm">
          {data && data.length > 0 ? (
            data.map((item) => {
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
                      {(item.type === 6 || item.type === 7) && (
                        <span className="mr-2 inline-block rounded-sm bg-green/10 px-2 py-1 text-green">
                          {t("systemLabel")}
                        </span>
                      )}
                    </>
                  )}
                  {item.content}
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
