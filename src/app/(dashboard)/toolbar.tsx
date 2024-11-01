"use client";

import { signOutAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  ClipboardCheck,
  Cog,
  FileText,
  Gamepad2,
  HomeIcon,
  MoonStar,
  QrCode,
  Scale,
  Sun,
  Tv2,
  UserSquare,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Toolbar() {
  const [name, _setName] = useState("Serati Ma");
  const { resolvedTheme: mode, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];
  return (
    <div className="w-full h-10 flex flex-row justify-between border-b px-2">
      <div className="flex flex-row gap-2 items-center text-sm">
        <TitleIcon title={firstPath} />
        <span>/</span>
        <TitleText pathname={pathname} />
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

function TitleIcon({ title }: { title: string }) {
  switch (title) {
    case "games":
      return <Gamepad2 className="size-4" />;
    case "users":
      return <Users className="size-4" />;
    case "reports":
      return <FileText className="size-4" />;
    case "withdraw":
      return <ClipboardCheck className="size-4" />;
    case "fund":
      return <Scale className="size-4" />;
    case "personal":
      return <UserSquare className="size-4" />;
    case "system":
      return <Tv2 className="size-4" />;
    case "maintain":
      return <Cog className="size-4" />;
    default:
      return <HomeIcon className="size-4" />;
  }
}

function TitleText({ pathname }: { pathname: string }) {
  const pathLength = pathname.split("/").length;
  const firstPath = pathname.split("/")[1];
  const secondPath = pathname.split("/")[2];
  const thirdPath = pathname.split("/")[3];
  const t = useTranslations("menu");
  if (pathLength === 3) {
    return (
      <>
        <span>{t(`${firstPath}.title`)}</span>
        <span>/</span>
        <span>{t(`${firstPath}.${secondPath}`)}</span>
      </>
    );
  }
  if (pathLength > 3) {
    return (
      <>
        <span>{t(`${firstPath}.title`)}</span>
        <span>/</span>
        <span>{t(`${firstPath}.${secondPath}.${thirdPath}`)}</span>
      </>
    );
  }
  return <span>{t("home")}</span>;
}
