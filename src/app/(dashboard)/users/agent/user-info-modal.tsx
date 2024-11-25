"use client";

import { resetRestCount, updateAgent } from "@/api";
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
import { agentDataAtom, agentIdAtom, userInfoModalAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function UserInfoModal() {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [isPending, startTransition] = useTransition();
  const open = useAtomValue(userInfoModalAtom);
  const setOpen = useSetAtom(userInfoModalAtom);
  const [upUsername, setUpUsername] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [remainLoginTime, setRemainLoginTime] = useState(0);
  const [status, setStatus] = useState(0);
  const router = useRouter();
  const userId = useAtomValue(agentIdAtom);

  const agentData = useAtomValue(agentDataAtom);

  useEffect(() => {
    if (agentData) {
      setUpUsername(agentData.upUsername);
      setUsername(agentData.username);
      setNickname(agentData.nickname);
      setRemainLoginTime(agentData.remainLoginTime);
      setStatus(agentData.status);
    }
    return () => {
      setUpUsername("");
      setUsername("");
      setNickname("");
      setRemainLoginTime(0);
      setStatus(0);
    };
  }, [agentData]);

  const handleClickUpdateUserInfo = async () => {
    const requestBody = {
      id: userId,
      status,
    };
    const { code, message } = await updateAgent(requestBody);
    console.info("updateAgent:", code, message);
    setOpen(false);
    router.refresh();
  };

  const handleClickResetRestCount = async () => {
    const { code, data, message } = await resetRestCount({ id: userId });
    if (code === 0) {
      setRemainLoginTime(Number(data));
      toast.success(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          {upUsername && (
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                {t("upUsername")}
              </Label>
              <span>{upUsername}</span>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("username")}
            </Label>
            <Input className="w-1/2" value={username} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("nickname")}
            </Label>
            <Input className="w-1/2" value={nickname} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("restCount")}
            </Label>
            <div>{remainLoginTime}</div>
            <Button size="sm" onClick={handleClickResetRestCount}>
              {t("reset")}
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("status")}
            </Label>
            <RadioGroup
              value={status.toString()}
              className="flex gap-2"
              onValueChange={(value) => setStatus(Number(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">{t("enable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">{t("disable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">{t("freeze")}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(handleClickUpdateUserInfo);
            }}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
