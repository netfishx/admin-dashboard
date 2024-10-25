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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("menu");
  return (
    <>
      <MenuItem label={t("home")} href="/" icon={<Home className="size-4" />} />
      <Collapsible defaultOpen={pathname.startsWith("/games")}>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("games.title")}
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
            label={t("users.title")}
            icon={<Users className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("users.member")} href="/2" />
          <MenuItem label={t("users.agent")} href="/2" />
          <MenuItem label={t("users.supplier")} href="/2" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("reports.title")}
            icon={<FileText className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("reports.order")} href="/3" />
          <MenuItem label={t("reports.period")} href="/3" />
          <MenuItem label={t("reports.agent")} href="/3" />
          <MenuItem label={t("reports.member")} href="/3" />
          <MenuItem label={t("reports.supplier")} href="/3" />
          <MenuItem label={t("reports.change")} href="/3" />
          <MenuItem label={t("reports.recharge")} href="/3" />
          <MenuItem label={t("reports.withdraw")} href="/3" />
          <MenuItem label={t("reports.borrow")} href="/3" />
          <MenuItem label={t("reports.reward")} href="/3" />
          <MenuItem label={t("reports.download")} href="/3" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("withdraw.title")}
            icon={<ClipboardCheck className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("withdraw.apply")} href="/4" />
          <MenuItem label={t("withdraw.audit")} href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("fund.title")}
            icon={<Scale className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("fund.minerfee")} href="/4" />
          <MenuItem label={t("fund.collection")} href="/4" />
          <MenuItem label={t("fund.withdrawfee")} href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("personal.title")}
            icon={<UserSquare className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("personal.info")} href="/4" />
          <MenuItem label={t("personal.loginlog")} href="/4" />
          <MenuItem label={t("personal.security")} href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("system.title")}
            icon={<Tv2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("system.role")} href="/4" />
          <MenuItem label={t("system.subaccount")} href="/4" />
          <MenuItem label={t("system.platform")} href="/4" />
          <MenuItem label={t("system.resource")} href="/4" />
          <MenuItem label={t("system.announcement")} href="/4" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("maintain.title")}
            icon={<Cog className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 pl-6">
          <MenuItem label={t("maintain.dictionary")} href="/4" />
          <MenuItem label={t("maintain.resource")} href="/4" />
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
