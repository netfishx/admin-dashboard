"use client";

import {} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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
      <div className="flex flex-col gap-1">
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
  return (
    <>
      <MenuItem label="首页" href="/" icon={<Home className="size-4" />} />
      <Collapsible defaultOpen={pathname.startsWith("/games")}>
        <CollapsibleTrigger asChild>
          <MenuItem
            label="游戏管理"
            icon={<Gamepad2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label="拦货设置" href="/games/flyorder" />
          <MenuItem label="赔率限制" href="/games/odds" />
          <MenuItem label="下级默认占成" href="/games/ratio" />
          <MenuItem label="退水设置" href="/games/rebate" />
          <MenuItem label="供应商设置" href="/games/supplier" />
          <MenuItem label="维护设置" href="/games/maintain" />
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
    </>
  );
}

function ClosedMenu({ pathname }: { pathname: string }) {
  const baseClass = "flex flex-col items-center justify-center w-12 h-9";
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
