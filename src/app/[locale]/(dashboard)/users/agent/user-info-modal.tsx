"use client";

import { updateUser } from "@/api";
import type { AgentData } from "@/api";
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
import { useState } from "react";
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
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [status, setStatus] = useState(1);
  const handleClickUpdateUserInfo = async () => {
    if (editData) {
      await updateUser({
        ...editData,
        userName: userName || editData.userName || "",
        nickName: nickName || editData.nickName || "",
        status: status || editData.status || 1,
      });
      onOpenChange(false, true);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open, false)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("upUserName")} :
            </Label>
            <span>{editData?.upUserName}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("userName")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={editData?.userName}
              className="w-1/4"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("nickName")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={editData?.nickName}
              className="w-1/4"
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("restCount")} :
            </Label>
            <span>3</span>
            <Button>{t("reset")}</Button>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("status")} :</Label>
            <Checkbox />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false, false)}>
            {t("close")}
          </Button>
          <Button onClick={handleClickUpdateUserInfo}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
