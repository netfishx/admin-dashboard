"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import type { AgentData } from "./page";
export function UserInfoModal({
  open,
  onOpenChange,
  editData,
}: {
  open: boolean;
  onOpenChange: (open: boolean, refresh: boolean) => void;
  editData: AgentData | null;
}) {
  const t = useTranslations("users.agents");
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open, false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("upUserName")}
            </Label>
            <span>{editData?.upUserName}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("userId")}</Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={editData?.userId}
              className="w-1/4"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("userName")}</Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={editData?.userName}
              className="w-1/4"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("restCount")}
            </Label>
            <span>3</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("status")}</Label>
            <Checkbox />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false, false)}>
            {t("close")}
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false, true);
            }}
          >
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
