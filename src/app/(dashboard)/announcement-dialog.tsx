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
        className="w-[90dvh] max-w-[90dvw]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{t("announcement")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full text-sm overflow-y-auto max-h-[500px]">
          {data?.list.map((item) => {
            return (
              <div
                key={item.id}
                className="text-ellipsis whitespace-nowrap overflow-hidden"
              >
                {item.type === 1 && (
                  <span className="mr-2 px-2 py-1 inline-block rounded-sm text-primary bg-primary/10">
                    {t("platform")}
                  </span>
                )}
                {item.type === 3 && (
                  <span className="mr-2 px-2 py-1 inline-block rounded-sm text-orange bg-orange/10">
                    {t("agent")}
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
