"use client";

import { signOutAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "@/i18n/routing";
import { ChevronDown, HomeIcon, MoonStar, QrCode, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Toolbar() {
  const [name, _setName] = useState("Serati Ma");
  const { resolvedTheme: mode, setTheme } = useTheme();
  const router = useRouter();
  const t = useTranslations("menu");
  const pathname = usePathname();
  return (
    <div className="w-full h-10 flex flex-row justify-between border-b px-2">
      <div className="flex flex-row gap-2 items-center text-sm">
        <HomeIcon className="size-4" />
        <span>/</span>
        {pathname.split("/").length > 2 ? (
          <>
            <span>{t(`${pathname.split("/")[1]}.title`)}</span>
            <span>/</span>
            <span>
              {t(`${pathname.split("/")[1]}.${pathname.split("/")[2]}`)}
            </span>
          </>
        ) : (
          <span>{t("home")}</span>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button
          variant="ghost"
          className="size-7 rounded-full border-2 px-1"
          onClick={() => {
            setTheme(mode === "dark" ? "light" : "dark");
          }}
        >
          {mode === "dark" ? (
            <MoonStar className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>
        <Button variant="ghost" className="size-7 rounded-full border-2 px-1">
          <QrCode className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {name}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                await signOutAction();
                router.replace("/login");
              }}
            >
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
