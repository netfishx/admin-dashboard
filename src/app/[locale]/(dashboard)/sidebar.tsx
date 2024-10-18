"use client";

import logo from "@/assets/images/logo.svg";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { Menu } from "./menu";
import { ToggleSidebar } from "./toggle-sidebar";

export function SideBar() {
  const isOpened = useAtomValue(sidebarAtom);
  return (
    <div
      className={cn([
        "flex flex-col shrink-0 h-full transition-all",
        isOpened ? "w-56 p-2" : "w-12 p-0",
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
            代理后台
          </h1>
        </div>
        <Menu />
      </div>
      <ToggleSidebar />
    </div>
  );
}
