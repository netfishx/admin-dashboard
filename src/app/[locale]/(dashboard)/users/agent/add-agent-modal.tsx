"use client";

import { addUser } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function AddAgentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean, refresh: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const handleClickAddAgent = async () => {
    await addUser({
      userName,
      nickName,
      userLevel: "代理",
      upUserName: "z111",
      userId: `A${Math.random().toString(36).substring(2, 15)}`,
      status: 1,
    });
    onOpenChange(false, true);
  };
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open, false)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("userName")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/4"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("nickName")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/4"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("userLevel")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/4"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClickAddAgent}>{t("save")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
