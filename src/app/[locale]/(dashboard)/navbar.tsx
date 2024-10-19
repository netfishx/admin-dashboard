"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, HomeIcon, MoonStar, QrCode, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
export function Navbar() {
  const [name, _setName] = useState("Serati Ma");
  const { resolvedTheme: mode, setTheme } = useTheme();
  return (
    <div className="w-full h-10 flex flex-row justify-between border-b px-2">
      <div className="flex flex-row gap-2 items-center text-sm">
        <HomeIcon className="size-4" />
        <span>/</span>
        <span>首页</span>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div
          className="cursor-pointer rounded-full border-solid border-2 p-1"
          onClick={() => {
            setTheme(mode === "dark" ? "light" : "dark");
          }}
        >
          {mode === "dark" ? (
            <MoonStar className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </div>
        <div className="cursor-pointer rounded-full border-solid border-2 p-1">
          <QrCode className="size-4" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {name}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
