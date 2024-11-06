"use client";

import { type AgentData, getAgentInfo, updateAgent } from "@/api";
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
import { agentIdAtom, userInfoModalAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserInfoModal() {
  const t = useTranslations("users.agents");
  const open = useAtomValue(userInfoModalAtom);
  const setOpen = useSetAtom(userInfoModalAtom);
  const [editData, setEditData] = useState<AgentData | null>(null);
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
          setUsername(data.username);
          setNickname(data.nickname);
          setStatus(data.status);
        }
      });
    }
    return () => {
      setEditData(null);
      setUsername("");
      setNickname("");
      setStatus(1);
    };
  }, [open, userId]);

  const handleClickUpdateUserInfo = async () => {
    const requestBody = {
      id: userId,
      username,
      nickname,
      status,
    };
    console.info("requestBody:", requestBody);
    const { code, message } = await updateAgent(requestBody);
    console.info("updateAgent:", code, message);
    setOpen(false);
    router.refresh();
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
            <span>{editData?.upUsername}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("username")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              value={username}
              className="w-1/2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("nickname")}
            </Label>
            <Input
              placeholder={t("placeholder")}
              value={nickname}
              className="w-1/2"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("restCount")}
            </Label>
            <div>{3}</div>
            <Button size="sm">{t("reset")}</Button>
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("close")}
          </Button>
          <Button onClick={handleClickUpdateUserInfo}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
