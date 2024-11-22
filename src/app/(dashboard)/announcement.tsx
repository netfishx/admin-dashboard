"use client";

import type { AnnouncementList } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Announcement({ data }: { data: { list: AnnouncementList[] } }) {
  const t = useTranslations();
  const router = useRouter();
  return (
    <>
      <div className="bg-background p-4 rounded flex-1">
        <div className="flex justify-between mb-4">
          <div>{t("announcement")}</div>
          <button
            type="button"
            className="text-primary text-sm"
            onClick={() => {
              router.push("/system/announcement/own");
            }}
          >
            {t("more")}
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full text-sm">
          {data?.list.map((item) => {
            return (
              <div
                key={item.id}
                className="text-ellipsis text-muted-foreground whitespace-nowrap overflow-hidden"
              >
                <span
                  className={cn(
                    "mr-2 px-2 py-1 inline-block rounded-sm",
                    `${item.type === "1" ? "text-primary bg-primary/10" : "text-orange bg-orange/10"}`,
                  )}
                >
                  {item.type === "1" ? "平台" : "代理"}
                </span>
                {item.contentOfLanguage}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
