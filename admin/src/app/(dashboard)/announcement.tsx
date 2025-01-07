"use client";

import type { AnnouncementList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";

export function Announcement({
  data,
  permissions,
}: {
  data: { list: AnnouncementList[] };
  permissions: string[];
}) {
  const t = useTranslations();
  const router = useTransitionRouter();

  return (
    <>
      <div className="bg-background relative flex-1 rounded-sm p-4">
        <div className="mb-4 flex justify-between">
          <div>{t("announcement")}</div>
          <button
            type="button"
            className="text-primary text-sm"
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
                  className="text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {!permissions?.includes("admin_stat") && (
                    <>
                      {item.type === 1 && (
                        <span className="bg-primary/10 text-primary mr-2 inline-block rounded-sm px-2 py-1">
                          {t("platform")}
                        </span>
                      )}
                      {item.type === 3 && (
                        <span className="bg-orange/10 text-orange mr-2 inline-block rounded-sm px-2 py-1">
                          {t("agent")}
                        </span>
                      )}
                      {(item.type === 6 || item.type === 7) && (
                        <span className="bg-green/10 text-green mr-2 inline-block rounded-sm px-2 py-1">
                          {t("systemLabel")}
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
              <div className="text-muted-foreground flex h-full items-center justify-center">
                {t("noData")}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
