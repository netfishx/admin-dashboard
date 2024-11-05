"use client";
import type { Announcement } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
export function ContentModal({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Announcement;
}) {
  const t = useTranslations("system.announcement");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("notifyAnnouncement")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>{data.content}</div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
