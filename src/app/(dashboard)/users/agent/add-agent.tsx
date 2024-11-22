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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { validateFormData } from "./validata";

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
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleClickAddAgent = async () => {
    startTransition(async () => {
      const result = await validateFormData({
        username,
        password,
        confirmPassword,
      });
      if (result.success) {
        const { data, code, message } = await addAgent({
          username,
          nickname,
          password,
        });
        console.info(data, code, message);
        onOpenChange(false);
        router.refresh();
        closeDialog();
      } else {
        console.info(result.errors);
        toast.error(result.errors?.[0]?.message);
      }
    });
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
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("username")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="flex-1"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) => {
                e.target.reportValidity();
              }}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("nickname")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="flex-1"
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
              required
              className="flex-1"
              placeholder={t("placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                e.target.reportValidity();
              }}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
              {t("confirmPassword")}
            </Label>
            <Password
              type="password"
              required
              className="flex-1"
              placeholder={t("placeholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => {
                e.target.reportValidity();
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              {translation("cancel")}
            </Button>
            <Button disabled={isPending} onClick={handleClickAddAgent}>
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {translation("confirm")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
