"use client";

import type { AnnouncementList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Announcement({ data }: { data: { list: AnnouncementList[] } }) {
  const t = useTranslations();
  const router = useRouter();
  return (
    <>
      <div className="bg-background p-4 rounded flex-1 relative">
        <div className="flex justify-between mb-4">
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
        <div className="flex flex-col gap-2 w-full text-sm">
          {data && data.list.length > 0 ? (
            data?.list.map((item) => {
              return (
                <div
                  key={item.id}
                  className="text-ellipsis text-muted-foreground whitespace-nowrap overflow-hidden"
                >
                  {item.type === 1 && (
                    <span className="mr-2 px-2 py-1 inline-block rounded-sm text-primary bg-primary/10">
                      {t("platform")}
                    </span>
                  )}
                  {item.type === 3 && (
                    <span className="mr-2 px-2 py-1 inline-block rounded-sm text-orange bg-orange/10">
                      {t("agent")}
                    </span>
                  )}
                  {item.contentOfLanguage}
                </div>
              );
            })
          ) : (
            <div className="h-20 lg:h-48 xl:h-72">
              <div className="text-muted-foreground h-full flex items-center justify-center">
                {t("noData")}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
