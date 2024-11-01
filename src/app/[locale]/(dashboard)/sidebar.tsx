'use client';

import logo from "@/assets/images/logo.svg";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu } from "./menu";
import { ToggleSidebar } from "./toggle-sidebar";

export function SideBar() {
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
          <Image
            src={logo}
            alt="Icon"
            className={cn([isOpened ? "size-8" : "size-6"])}
          />
          <h1 className={cn(["text-xl font-medium", isOpened ? "" : "hidden"])}>
            {t("title")}
          </h1>
        </div>
        <Menu />
      </div>
      <ToggleSidebar />
    </div>
  );
}
