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
import { contentModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export function ContentModal() {
  const translations = useTranslations();
  const t = useTranslations("system.announcement");
  const [open, setOpen] = useAtom(contentModalAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("notifyAnnouncement")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {/* todo content*/}
        {/* <div>{data?.content[0].content}</div> */}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
