"use client";

import {} from "@/api";
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
import type { MemberList } from "@/lib/types";
import { memberInfoDataAtom, memberInfoModalAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserInfoModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const open = useAtomValue(memberInfoModalAtom);
  const setOpen = useSetAtom(memberInfoModalAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const [, setEditData] = useState<MemberList | null>(null);
  const [agentUserId, setAgentUserId] = useState("");
  const [agentUsername, setAgentUsername] = useState("");
  const [memberId, setMemberId] = useState("");
  const [username, setUsername] = useState("");
  // todo 获取创建时间
  const [createTime, setCreateTime] = useState("");
  const [status, setStatus] = useState(1);
  const router = useRouter();
  useEffect(() => {
    if (open && memberInfoData) {
      //todo 获取代理信息
      // setAgentUserId(memberInfoData.upUserId);
      setAgentUsername(memberInfoData.upUsername);
      setMemberId(memberInfoData.id);
      setUsername(memberInfoData.username);
      setStatus(memberInfoData.status);
    }
    return () => {
      setEditData(null);
      setAgentUserId("");
      setAgentUsername("");
      setMemberId("");
      setUsername("");
      setStatus(1);
    };
  }, [open, memberInfoData]);

  const handleClickUpdateUserInfo = async () => {
    const requestBody = {
      id: memberInfoData?.id,
      status,
    };
    console.info("requestBody:", requestBody);
    // const { code, message } = await updateAgent(requestBody);
    // console.info("updateAgent:", code, message);
    setOpen(false);
    router.refresh();
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
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("agentUserId")}
            </Label>
            <Input className="w-1/2" value={agentUserId} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("agentUsername")}
            </Label>
            <Input className="w-1/2" value={agentUsername} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("memberId")}
            </Label>
            <Input className="w-1/2" value={memberId} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("memberUsername")}
            </Label>
            <Input className="w-1/2" value={username} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("createTime")}
            </Label>
            <Input className="w-1/2" value={createTime} disabled />
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
