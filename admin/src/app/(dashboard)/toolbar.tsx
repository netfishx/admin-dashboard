"use client";

import { signOutAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon } from "@/components/ui/home";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  ClipboardCheck,
  Cog,
  Copy,
  FileText,
  Gamepad2,
  Moon,
  QrCode,
  Scale,
  Sun,
  Tv2,
  UserSquare,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

export function Toolbar({
  username,
  inviteCode,
  hasInviteCode,
}: {
  username: string;
  inviteCode: string;
  hasInviteCode: boolean;
}) {
  const { setTheme } = useTheme();
  const [, copyToClipboard] = useCopyToClipboard();
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];
  const t = useTranslations();
  return (
    <div className="flex h-10 w-full shrink-0 justify-between border-b px-2">
      <div className="flex flex-row items-center gap-2 text-sm">
        <TitleIcon title={firstPath} />
        <span>/</span>
        <TitleText pathname={pathname} />
      </div>
      <div className="flex flex-row items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-7 rounded-full border-2 px-1 focus-visible:ring-0"
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {hasInviteCode && inviteCode && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="size-7 rounded-full border-2 px-1"
              >
                <QrCode className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <QRCodeSVG value={inviteCode} />
              <div className="flex flex-row items-center justify-center pt-2 text-xs">
                <span>{t("inviteCode")}:</span>
                <span>{inviteCode}</span>
                <Button
                  variant="ghost"
                  className="size-4"
                  onClick={() => {
                    copyToClipboard(inviteCode);
                    toast.success(t("copied"));
                  }}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {username}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                await signOutAction();
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
      return <HomeIcon />;
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
