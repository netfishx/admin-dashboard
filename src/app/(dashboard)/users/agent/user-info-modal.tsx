"use client";

import { updateUser } from "@/api";
import type { AgentData } from "@/api";
import { getAgentInfo } from "@/api";
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
import { userInfoModalAtom } from "@/store";
import { agentIdAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserInfoModal() {
  const t = useTranslations("users.agents");
  const open = useAtomValue(userInfoModalAtom);
  const setOpen = useSetAtom(userInfoModalAtom);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState(1);
  const [editData, setEditData] = useState<AgentData | null>(null);
  const userId = useAtomValue(agentIdAtom);
  useEffect(() => {
    if (open) {
      getAgentInfo({ id: userId }).then(({ data }) => {
        console.info("getAgentInfo:", data);
        if (data) {
          setEditData(data);
        }
      });
    }
  }, [open, userId]);

  const handleClickUpdateUserInfo = async () => {
    if (editData) {
      await updateUser({
        ...editData,
        username: username || editData.username || "",
        nickname: nickname || editData.nickname || "",
        status: status || editData.status || 1,
      });
      setOpen(false);
      router.refresh();
    }
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
              defaultValue={editData?.username}
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
              defaultValue={editData?.nickname}
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("close")}
          </Button>
          <Button onClick={handleClickUpdateUserInfo}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
