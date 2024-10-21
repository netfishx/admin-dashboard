"use client";

import {} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import {
  ClipboardCheck,
  Cog,
  FileText,
  Gamepad2,
  Home,
  Scale,
  Tv2,
  UserSquare,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { MenuItem } from "./menu-item";

export function Menu() {
  const isOpened = useAtomValue(sidebarAtom);
  const pathname = usePathname();
  return (
    <ScrollArea className="h-[calc(100dvh-8.5rem)]">
      <div className="flex flex-col gap-1 px-2">
        {isOpened ? (
          <OpenedMenu pathname={pathname} />
        ) : (
          <ClosedMenu pathname={pathname} />
        )}
      </div>
    </ScrollArea>
  );
}

function OpenedMenu({ pathname }: { pathname: string }) {
  const t = useScopedI18n("menu");
  return (
    <>
      <MenuItem label={t("home")} href="/" icon={<Home className="size-4" />} />
      <Collapsible defaultOpen={pathname.startsWith("/games")}>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("games")}
            icon={<Gamepad2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("games.flyorder")} href="/games/flyorder" />
          <MenuItem label={t("games.odds")} href="/games/odds" />
          <MenuItem label={t("games.ratio")} href="/games/ratio" />
          <MenuItem label={t("games.rebate")} href="/games/rebate" />
          <MenuItem label={t("games.supplier")} href="/games/supplier" />
          <MenuItem label={t("games.maintain")} href="/games/maintain" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="用户管理"
            icon={<Users className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="会员管理" href="/2" />
          <MenuItem label="代理管理" href="/2" />
          <MenuItem label="供应商管理" href="/2" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="报表管理"
            icon={<FileText className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="注单列表" href="/3" />
          <MenuItem label="按期汇总报表" href="/3" />
          <MenuItem label="代理报表" href="/3" />
          <MenuItem label="会员报表" href="/3" />
          <MenuItem label="供应商报表" href="/3" />
          <MenuItem label="账变记录" href="/3" />
          <MenuItem label="充值记录" href="/3" />
          <MenuItem label="提现记录" href="/3" />
          <MenuItem label="借还记录" href="/3" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="申请管理"
            icon={<ClipboardCheck className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="系统设置" href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="资金管理"
            icon={<Scale className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="系统设置" href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="个人中心"
            icon={<UserSquare className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="系统设置" href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="系统管理"
            icon={<Tv2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="系统设置" href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="平台维护"
            icon={<Cog className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="系统设置" href="/4" />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

function ClosedMenu({ pathname }: { pathname: string }) {
  const baseClass = "flex flex-col items-center justify-center h-9";
  return (
    <>
      <div className={cn([baseClass, pathname === "/" && "text-primary"])}>
        <Home className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/games") && "text-primary",
        ])}
      >
        <Gamepad2 className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/users") && "text-primary",
        ])}
      >
        <Users className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <FileText className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <ClipboardCheck className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <Scale className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <UserSquare className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <Tv2 className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/reports") && "text-primary",
        ])}
      >
        <Cog className="size-4" />
      </div>
    </>
  );
}
