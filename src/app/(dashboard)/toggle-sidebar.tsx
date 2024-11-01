"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtom } from "jotai";
import { PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function ToggleSidebar() {
  const [isOpened, setIsOpened] = useAtom(sidebarAtom);
  const t = useTranslations("menu");
  const [stop, setStop] = useState(false);
  async function handleStopChange(checked: boolean) {
    setStop(checked);
    toast.success(checked ? "Stop" : "Start");
  }
  return (
    <div
      className={cn([
        "flex h-12 py-4 items-center",
        isOpened ? "justify-between px-4" : "px-3",
      ])}
    >
      {isOpened && (
        <div className="flex items-center gap-2">
          <Switch checked={stop} onCheckedChange={handleStopChange} />
          <span className="text-sm">{t("stop")}</span>
        </div>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="size-6"
        onClick={() => setIsOpened(!isOpened)}
      >
        {isOpened ? (
          <PanelRightOpenIcon className="size-4" />
        ) : (
          <PanelRightCloseIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}
