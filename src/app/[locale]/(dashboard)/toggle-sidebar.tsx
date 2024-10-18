"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtom } from "jotai";
import { PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react";

export function ToggleSidebar() {
  const [isOpened, setIsOpened] = useAtom(sidebarAtom);
  return (
    <div
      className={cn([
        "flex h-12 py-4 items-center",
        isOpened ? "justify-end px-4" : "px-3",
      ])}
    >
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
