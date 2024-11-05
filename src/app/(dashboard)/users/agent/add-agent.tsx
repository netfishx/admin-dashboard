"use client";

import { addUser } from "@/api";
import Stepper from "@/components/stepper";
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
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [deptId, setDeptId] = useState<number>();
  const [step, setStep] = useState(1);
  const handleClickAddAgent = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    await addUser({
      username,
      nickname,
      deptId: deptId ?? 0,
      upUsername: "z111",
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
        <Stepper
          steps={[t("userInfo"), t("gamesSetting")]}
          currentStep={step}
        />
        <div className="flex flex-col gap-2 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("username")} :
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("nickname")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("deptId")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              className="w-1/2"
              value={deptId}
              onChange={(e) => setDeptId(Number(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => (step === 1 ? onOpenChange(false) : setStep(1))}
            >
              {step === 1 ? t("close") : t("back")}
            </Button>
            <Button onClick={handleClickAddAgent}>
              {step === 1 ? t("next") : t("save")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
