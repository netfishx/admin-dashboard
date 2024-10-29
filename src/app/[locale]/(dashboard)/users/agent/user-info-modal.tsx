"use client";

import { updateUser } from "@/api";
import type { AgentData } from "@/api";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function UserInfoModal({
  open,
  onOpenChange,
  editData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData: AgentData | null;
}) {
  const t = useTranslations("users.agents");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState(1);
  const handleClickUpdateUserInfo = async () => {
    if (editData) {
      await updateUser({
        ...editData,
        userName: userName || editData.userName || "",
        nickName: nickName || editData.nickName || "",
        status: status || editData.status || 1,
      });
      onOpenChange(false);
      router.refresh();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full">
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
            <Button className="py-0">{t("reset")}</Button>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("status")} :</Label>
            <RadioGroup
              defaultValue={editData?.status.toString()}
              className="flex gap-2"
              onValueChange={(value) => setStatus(Number(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">{t("enable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">{t("disable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">{t("freeze")}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("close")}
          </Button>
          <Button onClick={handleClickUpdateUserInfo}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
