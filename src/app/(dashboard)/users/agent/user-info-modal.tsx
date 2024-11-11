"use client";

import { getAgentInfo, resetRestCount, updateAgent } from "@/api";
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
import type { AgentData } from "@/lib/types";
import { agentIdAtom, userInfoModalAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserInfoModal() {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const open = useAtomValue(userInfoModalAtom);
  const setOpen = useSetAtom(userInfoModalAtom);
  const [editData, setEditData] = useState<AgentData | null>(null);
  const [upUsername, setUpUsername] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState(1);
  const router = useRouter();
  const userId = useAtomValue(agentIdAtom);
  useEffect(() => {
    if (open) {
      getAgentInfo({ id: userId }).then(({ data }) => {
        console.info("getAgentInfo:", data);
        if (data) {
          setEditData(data);
          setUpUsername(data.upUsername);
          setUsername(data.username);
          setNickname(data.nickname);
          setStatus(data.status);
        }
      });
    }
    return () => {
      setEditData(null);
      setUpUsername("");
      setUsername("");
      setNickname("");
      setStatus(1);
    };
  }, [open, userId]);

  const handleClickUpdateUserInfo = async () => {
    const requestBody = {
      id: userId,
      status,
    };
    console.info("requestBody:", requestBody);
    const { code, message } = await updateAgent(requestBody);
    console.info("updateAgent:", code, message);
    setOpen(false);
    router.refresh();
  };

  const handleClickResetRestCount = async () => {
    const { code, message } = await resetRestCount({ id: userId });
    console.info("resetRestCount:", code, message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("upUsername")}
            </Label>
            {/* <span>{editData?.upUsername}</span> */}
            <Input className="w-1/2" value={upUsername} disabled />
          </div>
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
            <div>{3}</div>
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
          <Button onClick={handleClickUpdateUserInfo}>
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
