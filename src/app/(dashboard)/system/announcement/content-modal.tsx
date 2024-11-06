"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contentModalAtom, contentModalDataAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export function ContentModal() {
  const t = useTranslations("system.announcement");
  const [open, setOpen] = useAtom(contentModalAtom);
  const data = useAtomValue(contentModalDataAtom);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("notifyAnnouncement")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>{data?.content}</div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
