"use client";

import { MenuItem, MenuItemLink } from "@/app/(dashboard)/menu-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Suspense } from "react";

export function Menu({ permissions }: { permissions: string[] }) {
  const isOpened = useAtomValue(sidebarAtom);
  const pathname = usePathname();
  return (
    <ScrollArea className="h-[calc(100dvh-8.5rem)]">
      <div className="flex flex-col gap-1 px-2" suppressHydrationWarning={true}>
        {isOpened ? (
          <Suspense>
            <OpenedMenu pathname={pathname} permissions={permissions} />
          </Suspense>
        ) : (
          <ClosedMenu pathname={pathname} permissions={permissions} />
        )}
      </div>
    </ScrollArea>
  );
}

function OpenedMenu({
  pathname,
  permissions,
}: {
  pathname: string;
  permissions: string[];
}) {
  const t = useTranslations("menu");
  const [openedMenu, setOpenedMenu] = useQueryState<string[]>(
    "openedMenu",
    parseAsArrayOf(parseAsString).withDefault([pathname.split("/")[1]]),
  );

  async function handleOpenChange(key: string, e: boolean) {
    await setOpenedMenu(
      e ? [...openedMenu, key] : openedMenu.filter((v) => v !== key),
    );
  }
  return (
    <>
      {permissions.includes("agent_stat") && (
        <MenuItem
          label={t("home")}
          href="/"
          icon={<Home className="size-4" />}
        />
      )}
      {permissions.some((v) =>
        [
          "fly_config",
          "edit_odds",
          "edit_radio",
          "edit_rebate",
          "supplier_config",
          "game_maintain",
        ].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("games")}
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
            {permissions.includes("fly_config") && (
              <MenuItem label={t("games.flyorder")} href="/games/flyorder" />
            )}
            {permissions.includes("edit_odds") && (
              <MenuItem label={t("games.odds")} href="/games/odds" />
            )}
            {permissions.includes("edit_radio") && (
              <MenuItem label={t("games.ratio")} href="/games/ratio" />
            )}
            {permissions.includes("edit_rebate") && (
              <MenuItem label={t("games.rebate")} href="/games/rebate" />
            )}
            {permissions.includes("supplier_config") && (
              <MenuItem label={t("games.supplier")} href="/games/supplier" />
            )}
            {permissions.includes("game_maintain") && (
              <MenuItem label={t("games.maintain")} href="/games/maintain" />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}

      {permissions.some((v) =>
        ["agent_config", "member_config", "users_supplier"].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("users")}
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
            {permissions.includes("agent_config") && (
              <MenuItem label={t("users.agent")} href="/users/agent" />
            )}
            {permissions.includes("member_config") && (
              <MenuItem label={t("users.member")} href="/users/member" />
            )}
            {permissions.includes("users_supplier") && (
              <MenuItem label={t("users.supplier")} href="/users/supplier" />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {permissions.some((v) =>
        [
          "detail_baccarat",
          "detail_guandan",
          "period_report",
          "agent_report_baccarat",
          "agent_report_guandan",
          "member_report_baccarat",
          "supplier_report",
          "change_report",
          "recharge_report",
          "withdraw_report",
          "borrow_report",
          "credit_report",
          "report_download",
        ].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("reports")}
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
            {permissions.includes("detail_baccarat") && (
              <MenuItem
                label={t("reports.order.baccarat")}
                href="/reports/order/baccarat"
              />
            )}
            {permissions.includes("detail_guandan") && (
              <MenuItem
                label={t("reports.order.guandan")}
                href="/reports/order/guandan"
              />
            )}
            {permissions.includes("period_report") && (
              <MenuItem label={t("reports.period")} href="/reports/period" />
            )}
            {permissions.includes("agent_report_baccarat") && (
              <MenuItem
                label={t("reports.agent.baccarat")}
                href="/reports/agent/baccarat/ratio"
                subHref={["/reports/agent/baccarat/member"]}
              />
            )}
            {permissions.includes("agent_report_guandan") && (
              <MenuItem
                label={t("reports.agent.guandan")}
                href="/reports/agent/guandan"
              />
            )}
            {permissions.includes("member_report_baccarat") && (
              <MenuItem
                label={t("reports.member.baccarat")}
                href="/reports/member/baccarat"
              />
            )}
            {permissions.includes("supplier_report") && (
              <MenuItem
                label={t("reports.supplier")}
                href="/reports/supplier"
              />
            )}
            {permissions.includes("change_report") && (
              <MenuItem label={t("reports.change")} href="/reports/change" />
            )}
            {permissions.includes("recharge_report") && (
              <MenuItem
                label={t("reports.recharge")}
                href="/reports/recharge"
              />
            )}
            {permissions.includes("withdraw_report") && (
              <MenuItem
                label={t("reports.withdraw")}
                href="/reports/withdraw"
              />
            )}
            {permissions.includes("credit_report") && (
              <MenuItem label={t("reports.credit")} href="/reports/credit" />
            )}
            {permissions.includes("borrow_report") && (
              <MenuItem label={t("reports.borrow")} href="/reports/borrow" />
            )}
            {permissions.includes("transfer_report") && (
              <MenuItem
                label={t("reports.transfer")}
                href="/reports/transfer"
              />
            )}
            {permissions.includes("report_download") && (
              <MenuItem
                label={t("reports.download")}
                href="/reports/download"
              />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {permissions.some((v) => ["withdraw_apply", "audit"].includes(v)) && (
        <Collapsible
          defaultOpen={openedMenu.includes("withdraw")}
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
            {permissions.includes("withdraw_apply") && (
              <MenuItem label={t("withdraw.apply")} href="/withdraw/apply" />
            )}
            {permissions.includes("audit") && (
              <MenuItem label={t("withdraw.audit")} href="/withdraw/audit" />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}

      {permissions.some((v) =>
        [
          "personal_info",
          "login_log",
          "edit_password",
          "money_password",
        ].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("personal")}
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
            {permissions.includes("personal_info") && (
              <MenuItem label={t("personal.info")} href="/personal/info" />
            )}
            {permissions.includes("login_log") && (
              <MenuItem
                label={t("personal.loginlog")}
                href="/personal/loginlog"
              />
            )}
            {(permissions.includes("edit_password") ||
              permissions.includes("money_password")) && (
              <MenuItem
                label={t("personal.security")}
                href="/personal/security"
              />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {permissions.some((v) =>
        ["system_role", "sub_account", "own_announcement"].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("system")}
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
            {permissions.includes("system_role") && (
              <MenuItem label={t("system.role")} href="/system/role" />
            )}
            {permissions.includes("sub_account") && (
              <MenuItem
                label={t("system.subaccount")}
                href="/system/subaccount"
              />
            )}
            {permissions.includes("own_announcement") && (
              <MenuItem
                label={t("system.announcement.title")}
                href="/system/announcement/own"
                subHref={[
                  "/system/announcement/platform",
                  "/system/announcement/all",
                  "/system/announcement/own",
                ]}
              />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {permissions.some((v) =>
        ["withdrawfee", "minerfee", "collection"].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("fund")}
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
            {permissions.includes("minerfee") && (
              <MenuItem label={t("fund.minerfee")} href="/fund/minerfee" />
            )}
            {permissions.includes("collection") && (
              <MenuItem label={t("fund.collection")} href="/fund/collection" />
            )}
            {permissions.includes("withdrawfee") && (
              <MenuItem
                label={t("fund.withdrawfee")}
                href="/fund/withdrawfee"
              />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {permissions.some((v) =>
        ["dictionary", "resource_config"].includes(v),
      ) && (
        <Collapsible
          defaultOpen={openedMenu.includes("maintain")}
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
            {permissions.includes("dictionary") && (
              <MenuItem
                label={t("maintain.dictionary")}
                href="/maintain/dictionary"
              />
            )}
            {permissions.includes("resource_config") && (
              <MenuItem
                label={t("maintain.resource")}
                href="/maintain/resource"
              />
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
}

function ClosedMenu({
  pathname,
  permissions,
}: {
  pathname: string;
  permissions: string[];
}) {
  const t = useTranslations("menu");
  const baseClass = "flex flex-col items-center justify-center h-9";
  return (
    <>
      {permissions.includes("agent_stat") && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([baseClass, pathname === "/" && "text-primary"])}
              >
                <MenuItemLink
                  href="/"
                  isActive={pathname === "/"}
                  className="w-full px-0"
                >
                  <Home className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("home")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        [
          "fly_config",
          "edit_odds",
          "edit_radio",
          "edit_rebate",
          "supplier_config",
          "game_maintain",
        ].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/games") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/games/flyorder"
                  isActive={pathname.startsWith("/games")}
                  className="w-full px-0"
                >
                  <Gamepad2 className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("games.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        ["agent_config", "member_config", "users_supplier"].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/users") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/users/agent"
                  isActive={pathname.startsWith("/users")}
                  className="w-full px-0"
                >
                  <Users className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("users.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        [
          "detail_baccarat",
          "detail_guandan",
          "period_report",
          "agent_report_baccarat",
          "agent_report_guandan",
          "member_report_baccarat",
          "supplier_report",
          "change_report",
          "recharge_report",
          "withdraw_report",
          "borrow_report",
          "credit_report",
          "report_download",
        ].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/reports") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/reports/order/baccarat"
                  isActive={pathname.startsWith("/reports")}
                  className="w-full px-0"
                >
                  <FileText className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("reports.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) => ["withdraw_apply", "audit"].includes(v)) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/withdraw") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/withdraw/apply"
                  isActive={pathname.startsWith("/withdraw")}
                  className="w-full px-0"
                >
                  <ClipboardCheck className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("withdraw.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        [
          "personal_info",
          "login_log",
          "edit_password",
          "money_password",
        ].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/personal") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/personal/info"
                  isActive={pathname.startsWith("/personal")}
                  className="w-full px-0"
                >
                  <UserSquare className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("personal.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        ["system_role", "sub_account", "own_announcement"].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/system") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/system/role"
                  isActive={pathname.startsWith("/system")}
                  className="w-full px-0"
                >
                  <Tv2 className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("system.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        ["minerfee", "collection", "withdrawfee"].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/fund") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/fund/minerfee"
                  isActive={pathname.startsWith("/fund")}
                  className="w-full px-0"
                >
                  <Scale className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("fund.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {permissions.some((v) =>
        ["dictionary", "resource_config"].includes(v),
      ) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn([
                  baseClass,
                  pathname.startsWith("/maintain") && "text-primary",
                ])}
              >
                <MenuItemLink
                  href="/maintain/dictionary"
                  isActive={pathname.startsWith("/maintain")}
                  className="w-full px-0"
                >
                  <Cog className="size-4" />
                </MenuItemLink>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("maintain.title")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
