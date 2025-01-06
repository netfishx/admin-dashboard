"use client";
import { editReceiveOrder } from "@/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtom } from "jotai";
import { PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function ToggleSidebar({
  status,
  hasReceiveOrderPermission,
}: {
  status: boolean;
  hasReceiveOrderPermission: boolean;
}) {
  const [isOpened, setIsOpened] = useAtom(sidebarAtom);
  const t = useTranslations("menu");
  const [stop, setStop] = useState(status);
  async function handleChange(checked: boolean) {
    setStop(checked);
    await editReceiveOrder({ status: checked });
    if (checked) {
      toast.error(t("stop"));
    } else {
      toast.success(t("start"));
    }
  }

  return (
    <div
      className={cn([
        "flex h-12 items-center py-4",
        isOpened ? "px-4" : "px-3",
        hasReceiveOrderPermission ? "justify-between" : "justify-end",
      ])}
    >
      {hasReceiveOrderPermission && (
        <div
          className={cn("flex items-center gap-2", isOpened ? "" : "hidden")}
        >
          <Switch checked={stop} onCheckedChange={handleChange} />
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
