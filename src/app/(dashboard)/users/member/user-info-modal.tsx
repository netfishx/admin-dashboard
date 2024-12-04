"use client";

import { getAgentInfoByUsername, updateMember } from "@/api";
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
import { memberInfoDataAtom, memberInfoModalAtom } from "@/store";
import { format } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function UserInfoModal({
  permissions,
}: { permissions: string[] | undefined }) {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const open = useAtomValue(memberInfoModalAtom);
  const [isPending, startTransition] = useTransition();
  const [isChecking, startChecking] = useTransition();
  const setOpen = useSetAtom(memberInfoModalAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const [agentId, setAgentId] = useState("");
  const [upUsername, setUpUsername] = useState("");
  const [upNickname, setUpNickname] = useState("");
  const [memberId, setMemberId] = useState("");
  const [username, setUsername] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [tempNickname, setTempNickname] = useState("");
  const [memberNickname, setMemberNickname] = useState("");
  // todo 获取创建时间
  const [createTime, setCreateTime] = useState<number>(0);
  const [status, setStatus] = useState(1);
  const router = useRouter();
  useEffect(() => {
    if (open && memberInfoData) {
      setUpUsername(memberInfoData.upUsername);
      // setUpNickname(memberInfoData.upNickname);
      setMemberId(memberInfoData.id);
      setUsername(memberInfoData.username);
      setMemberNickname(memberInfoData.nickname);
      setCreateTime(memberInfoData.createTime);
      setStatus(memberInfoData.status);
    }
    return () => {
      setUpUsername("");
      // setUpNickname("");
      setMemberId("");
      setUsername("");
      setMemberNickname("");
      setCreateTime(0);
      setStatus(1);
    };
  }, [open, memberInfoData]);

  const handleClickUpdateUserInfo = async () => {
    if (!upNickname) {
      toast.error("请输入代理账号");
      return;
    }
    const requestBody = {
      id: memberId,
      status,
      agentId,
    };
    const { code, message } = await updateMember(requestBody);
    if (code === 0) {
      toast.success(message);
      setOpen(false);
      router.refresh();
    } else {
      toast.error(message);
    }
  };

  const handleCheckAgent = async () => {
    startChecking(async () => {
      const { code, message, data } = await getAgentInfoByUsername({
        username: upUsername,
      });
      if (code === 0) {
        setUpNickname(data?.nickname ?? "");
        setAgentId(data?.id ?? "");
      } else {
        toast.error(message);
      }
    });
  };

  const handleFocus = () => {
    if (upUsername) {
      setUpUsername("");
      setUpNickname("");
      setTempUsername(upUsername);
      setTempNickname(upNickname);
    }
  };
  const handleBlur = () => {
    if (!upUsername) {
      setUpUsername(tempUsername);
      setUpNickname(tempNickname);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          {permissions?.includes("member_search") && (
            <>
              <div className="flex gap-4 items-center">
                <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                  {t("agentUsername")}
                </Label>
                <Input
                  className="w-1/2"
                  value={upUsername}
                  onFocus={handleFocus}
                  onChange={(e) => setUpUsername(e.target.value)}
                  onBlur={handleBlur}
                />
                <Button
                  onClick={handleCheckAgent}
                  disabled={isChecking}
                  size="sm"
                >
                  {isChecking && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("check")}
                </Button>
              </div>
              <div className="flex gap-4 items-center">
                <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                  {t("agentNickname")}
                </Label>
                <Input
                  className="w-1/2"
                  value={upNickname}
                  onFocus={handleFocus}
                  disabled
                />
              </div>
            </>
          )}
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("memberId")}
            </Label>
            <Input className="w-1/2" value={username} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("memberUsername")}
            </Label>
            <Input className="w-1/2" value={memberNickname} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("createTime")}
            </Label>
            <Input
              className="w-1/2"
              value={format(createTime, "yyyy-MM-dd HH:mm:ss")}
              disabled
            />
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
            onClick={() => startTransition(handleClickUpdateUserInfo)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
