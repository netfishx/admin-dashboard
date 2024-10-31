"use client";

import { addUser } from "@/api";
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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddAgent() {
  const t = useTranslations("users.agents");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("addAgent")}</Button>
      <AddAgentModal open={open} onOpenChange={setOpen} />
    </>
  );
}

function AddAgentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  const router = useRouter();
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
    onOpenChange(false);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("userName")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("nickName")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("userLevel")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("close")}
            </Button>
            <Button onClick={handleClickAddAgent}>{t("save")}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
