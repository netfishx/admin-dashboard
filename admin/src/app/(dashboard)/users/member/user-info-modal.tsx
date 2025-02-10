"use client";

import { getAgentInfoByUsername, updateMember } from "@/api";
import { Time } from "@/components/time";
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
import { useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function UserInfoModal({ permissions }: { permissions: string[] }) {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const open = useAtomValue(memberInfoModalAtom);
  const [isPending, startTransition] = useTransition();
  const [isChecking, startChecking] = useTransition();
  const setOpen = useSetAtom(memberInfoModalAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const [agentId, setAgentId] = useState<string>();
  const [upNickname, setUpNickname] = useState<string>();
  const router = useTransitionRouter();
  const ref = useRef<HTMLFormElement>(null);

  function handleUpdateStatus(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!memberInfoData) {
      return;
    }
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const status = formData.get("status");
      const { code, message } = await updateMember({
        id: memberInfoData.id,
        status: Number(status),
        agentId,
      });
      if (code === 0) {
        toast.success(message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  }

  const handleCheckAgent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startChecking(async () => {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const { code, message, data } = await getAgentInfoByUsername({
        username,
      });
      if (code === 0) {
        setUpNickname(data?.nickname);
        setAgentId(data?.id);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex w-full flex-col gap-4 px-4">
          {permissions?.includes("member_search") &&
          memberInfoData?.agentId === "-2" ? (
            <>
              <Form action="" onSubmit={handleCheckAgent}>
                <div className="flex items-center gap-4">
                  <Label className="w-1/4 shrink-0 text-right text-muted-foreground">
                    {t("agentUsername")}
                  </Label>

                  <Input
                    className="w-1/2"
                    name="username"
                    required
                    defaultValue={memberInfoData?.upUsername}
                  />
                  <Button disabled={isChecking} size="sm" type="submit">
                    {isChecking && <Loader2 className="animate-spin" />}
                    {t("check")}
                  </Button>
                </div>
              </Form>
              <div className="flex items-center gap-4">
                <Label className="w-1/4 shrink-0 text-right text-muted-foreground">
                  {t("agentNickname")}
                </Label>
                <Input
                  className="w-1/2"
                  value={upNickname || memberInfoData?.upNickname}
                  disabled
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Label className="w-1/4 shrink-0 text-right text-muted-foreground">
                  {t("agentUsername")}
                </Label>
                <span>{memberInfoData?.upUsername}</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Label className="w-1/4 shrink-0 text-right text-muted-foreground">
                  {t("agentNickname")}
                </Label>
                <span>{memberInfoData?.upNickname}</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-4 text-muted-foreground">
            <Label className="w-1/4 shrink-0 text-right">{t("memberId")}</Label>
            <span>{memberInfoData?.username}</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Label className="w-1/4 shrink-0 text-right">
              {t("memberUsername")}
            </Label>
            <span>{memberInfoData?.nickname}</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Label className="w-1/4 shrink-0 text-right">
              {t("createTime")}
            </Label>
            <span>
              {memberInfoData?.joinTime && (
                <Time time={memberInfoData?.joinTime} />
              )}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-1/4 shrink-0 text-right text-muted-foreground">
              {t("status")}
            </Label>
            <Form action="" onSubmit={handleUpdateStatus} ref={ref}>
              <RadioGroup
                defaultValue={memberInfoData?.status.toString()}
                className="flex gap-2"
                name="status"
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
            </Form>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();

              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
