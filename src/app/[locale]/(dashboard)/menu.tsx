"use client";

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
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { startTransition } from "react";
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
  const [openedMenu, setOpenedMenu] = useQueryState<string[]>(
    "openedMenu",
    parseAsArrayOf(parseAsString).withDefault([pathname.split("/")[1]]),
  );

  function handleOpenChange(key: string, e: boolean) {
    startTransition(async () => {
      e
        ? await setOpenedMenu([...openedMenu, key])
        : await setOpenedMenu(openedMenu.filter((v) => v !== key));
    });
  }
  return (
    <>
      <MenuItem label={t("home")} href="/" icon={<Home className="size-4" />} />
      <Collapsible
        open={openedMenu.includes("games")}
        onOpenChange={(e) => handleOpenChange("games", e)}
      >
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
      <Collapsible
        open={openedMenu.includes("users")}
        onOpenChange={(e) => handleOpenChange("users", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("users.title")}
            icon={<Users className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("users.agent")} href="/users/agent" />
          <MenuItem label={t("users.member")} href="/users/member" />
          <MenuItem label={t("users.supplier")} href="/users/supplier" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("reports")}
        onOpenChange={(e) => handleOpenChange("reports", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("reports.title")}
            icon={<FileText className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem
            label={t("reports.order.baccarat")}
            href="/reports/order/baccarat"
          />
          <MenuItem
            label={t("reports.order.gundan")}
            href="/reports/order/gundan"
          />
          <MenuItem label={t("reports.period")} href="/reports/period" />
          <MenuItem
            label={t("reports.agent.baccarat")}
            href="/reports/agent/baccarat"
          />
          <MenuItem
            label={t("reports.agent.gundan")}
            href="/reports/agent/gundan"
          />
          <MenuItem
            label={t("reports.member.baccarat")}
            href="/reports/member/baccarat"
          />
          <MenuItem
            label={t("reports.member.gundan")}
            href="/reports/member/gundan"
          />
          <MenuItem label={t("reports.supplier")} href="/reports/supplier" />
          <MenuItem label={t("reports.change")} href="/reports/change" />
          <MenuItem label={t("reports.recharge")} href="/reports/recharge" />
          <MenuItem label={t("reports.withdraw")} href="/reports/withdraw" />
          <MenuItem label={t("reports.borrow")} href="/reports/borrow" />
          <MenuItem label={t("reports.reward")} href="/reports/reward" />
          <MenuItem label={t("reports.credit")} href="/reports/credit" />
          <MenuItem label={t("reports.download")} href="/reports/download" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("withdraw")}
        onOpenChange={(e) => handleOpenChange("withdraw", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("withdraw.title")}
            icon={<ClipboardCheck className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("withdraw.apply")} href="/withdraw/apply" />
          <MenuItem label={t("withdraw.audit")} href="/withdraw/audit" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("fund")}
        onOpenChange={(e) => handleOpenChange("fund", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("fund.title")}
            icon={<Scale className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("fund.minerfee")} href="/fund/minerfee" />
          <MenuItem label={t("fund.collection")} href="/fund/collection" />
          <MenuItem label={t("fund.withdrawfee")} href="/fund/withdrawfee" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("personal")}
        onOpenChange={(e) => handleOpenChange("personal", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("personal.title")}
            icon={<UserSquare className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("personal.info")} href="/personal/info" />
          <MenuItem label={t("personal.loginlog")} href="/personal/loginlog" />
          <MenuItem label={t("personal.security")} href="/personal/security" />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("system")}
        onOpenChange={(e) => handleOpenChange("system", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("system.title")}
            icon={<Tv2 className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem label={t("system.role")} href="/system/role" />
          <MenuItem label={t("system.subaccount")} href="/system/subaccount" />
          <MenuItem label={t("system.platform")} href="/system/platform" />
          <MenuItem label={t("system.resource")} href="/system/resource" />
          <MenuItem
            label={t("system.announcement")}
            href="/system/announcement"
          />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={openedMenu.includes("maintain")}
        onOpenChange={(e) => handleOpenChange("maintain", e)}
      >
        <CollapsibleTrigger asChild>
          <MenuItem
            label={t("maintain.title")}
            icon={<Cog className="size-4" />}
            hasChildren
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1 px-6">
          <MenuItem
            label={t("maintain.dictionary")}
            href="/maintain/dictionary"
          />
          <MenuItem label={t("maintain.resource")} href="/maintain/resource" />
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
          pathname.startsWith("/withdraw") && "text-primary",
        ])}
      >
        <ClipboardCheck className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/fund") && "text-primary",
        ])}
      >
        <Scale className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/personal") && "text-primary",
        ])}
      >
        <UserSquare className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/system") && "text-primary",
        ])}
      >
        <Tv2 className="size-4" />
      </div>
      <div
        className={cn([
          baseClass,
          pathname.startsWith("/maintain") && "text-primary",
        ])}
      >
        <Cog className="size-4" />
      </div>
    </>
  );
}
