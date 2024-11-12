"use client";

import { addAgent } from "@/api";
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
import { Password } from "@/components/ui/password";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddAgent() {
  const t = useTranslations("users.agents");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        {t("addAgent")}
      </Button>
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
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const router = useRouter();
  const [upUsername, setUpUsername] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClickAddAgent = async () => {
    const { data, code, message } = await addAgent({
      username,
      nickname,
      password,
    });
    console.info(data, code, message);
    onOpenChange(false);
    router.refresh();
  };
  const closeDialog = () => {
    setUsername("");
    setNickname("");
    setPassword("");
    setConfirmPassword("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("upUsername")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2 max-w-[200px]"
              value={upUsername}
              onChange={(e) => setUpUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("username")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2 max-w-[200px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("nickname")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2 max-w-[200px]"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("password")}
            </Label>
            <Password
              type="password"
              className="w-1/2 max-w-[200px] min-w-[200px]"
              placeholder={t("placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("confirmPassword")}
            </Label>
            <Password
              type="password"
              className="w-1/2 max-w-[200px] min-w-[200px]"
              placeholder={t("placeholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              {translation("cancel")}
            </Button>
            <Button onClick={handleClickAddAgent}>
              {translation("confirm")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
