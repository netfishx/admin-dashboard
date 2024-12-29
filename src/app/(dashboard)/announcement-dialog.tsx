"use client";
import { setIsFirstLogin } from "@/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AnnouncementList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function AnnouncementDialog({
  data,
  isFirstLogin,
}: {
  data: { list: AnnouncementList[] };
  isFirstLogin: string;
}) {
  const t = useTranslations("");
  const [open, setOpen] = useState(true);
  async function handleOpenChange(open: boolean) {
    setIsFirstLogin();
    setOpen(open);
  }

  return (
    <Dialog
      open={open && isFirstLogin === "true"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className="w-[70dvw] max-w-[70dvw]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{t("announcement")}</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[500px] w-full flex-col gap-2 overflow-y-auto text-sm">
          {data?.list.map((item) => {
            return (
              <div
                key={item.id}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item.type === 1 && (
                  <span className="bg-primary/10 text-primary mr-2 inline-block rounded-sm px-2 py-1">
                    {t("platform")}
                  </span>
                )}
                {item.type === 3 && (
                  <span className="bg-orange/10 text-orange mr-2 inline-block rounded-sm px-2 py-1">
                    {t("agent")}
                  </span>
                )}
                {(item.type === 6 || item.type === 7) && (
                  <span className="bg-green/10 text-green mr-2 inline-block rounded-sm px-2 py-1">
                    {t("systemLabel")}
                  </span>
                )}
                {item.contentOfLanguage}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
