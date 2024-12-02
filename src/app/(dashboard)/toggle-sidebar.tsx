"use client";
import { editReviceOrder } from "@/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Res } from "@/lib/types";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtom } from "jotai";
import { PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { use, useState } from "react";
import { toast } from "sonner";

export function ToggleSidebar({
  reviceOrder,
  permissions,
}: {
  reviceOrder: Promise<Res<{ status: boolean }>>;
  permissions: string[];
}) {
  const [isOpened, setIsOpened] = useAtom(sidebarAtom);
  const t = useTranslations("menu");
  const isReviceOrder = permissions.includes("revice_order");
  let status = false;
  if (isReviceOrder) {
    const res = use(reviceOrder);
    status = res.data?.status ?? false;
  }
  const [stop, setStop] = useState(status);
  async function handleChange(checked: boolean) {
    setStop(checked);
    await editReviceOrder({ status: checked });
    if (checked) {
      toast.error(t("stop"));
    } else {
      toast.success(t("start"));
    }
  }

  return (
    <div
      className={cn([
        "flex h-12 py-4 items-center",
        isOpened ? "px-4" : "px-3",
        isReviceOrder ? "justify-between" : "justify-end",
      ])}
    >
      {isReviceOrder && (
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
