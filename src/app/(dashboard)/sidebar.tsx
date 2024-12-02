"use client";

import { Menu } from "@/app/(dashboard)/menu";
import { ToggleSidebar } from "@/app/(dashboard)/toggle-sidebar";
import type { Res } from "@/lib/types";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export function SideBar({
  reviceOrder,
  permissions,
}: {
  reviceOrder: Promise<Res<{ status: boolean }>>;
  permissions: string[];
}) {
  const t = useTranslations();
  const isOpened = useAtomValue(sidebarAtom);
  return (
    <div
      className={cn([
        "flex flex-col shrink-0 h-full transition-all border-r",
        isOpened ? "w-56 min-[2400px]:w-96" : "w-12",
      ])}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div
          className={cn([
            "w-full h-16 py-4 gap-4 flex items-center",
            isOpened ? "px-4" : "px-3",
          ])}
        >
          <svg
            className={cn([isOpened ? "size-8" : "size-6"])}
            width="192"
            height="192"
            fill="none"
            viewBox="0 0 27 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>logo</title>
            <g fillRule="evenodd" clipRule="evenodd" clipPath="url(#a)">
              <path
                d="M2.628 10.48 10 2.93a5.096 5.096 0 0 1 7.292 0l.08.083a5.226 5.226 0 0 1 0 7.302L10 17.865a5.096 5.096 0 0 1-7.292 0l-.08-.083a5.226 5.226 0 0 1 0-7.302Z"
                fill="#12D2AC"
              />
              <path
                d="m17.298 2.93 7.292 7.467a5.344 5.344 0 0 1 0 7.467 5.096 5.096 0 0 1-7.292 0l-7.292-7.467a5.344 5.344 0 0 1 0-7.467 5.096 5.096 0 0 1 7.292 0Z"
                fill="#307AF2"
              />
              <path
                d="m17.382 3.022 3.553 3.638-7.292 7.467L6.351 6.66l3.553-3.638a5.226 5.226 0 0 1 7.478 0Z"
                fill="#0057FE"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path
                  fill="#fff"
                  transform="translate(.75 .5)"
                  d="M0 0h26v19H0z"
                />
              </clipPath>
            </defs>
          </svg>
          <h1 className={cn(["text-xl font-medium", isOpened ? "" : "hidden"])}>
            {t("title")}
          </h1>
        </div>
        <Menu permissions={permissions} />
      </div>
      <ToggleSidebar reviceOrder={reviceOrder} permissions={permissions} />
    </div>
  );
}
