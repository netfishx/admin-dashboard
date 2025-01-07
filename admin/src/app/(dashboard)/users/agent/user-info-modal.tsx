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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { agentDataAtom, agentIdAtom, userInfoModalAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function UserInfoModal() {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [isPending, startTransition] = useTransition();
  const open = useAtomValue(userInfoModalAtom);
  const setOpen = useSetAtom(userInfoModalAtom);
  const router = useTransitionRouter();
  const userId = useAtomValue(agentIdAtom);

  const agentData = useAtomValue(agentDataAtom);

  const [times, setTimes] = useState(agentData?.remainLoginTime ?? 0);

  const ref = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.target as HTMLFormElement);
      const status = formData.get("status");
      const { code, message } = await updateAgent({
        id: userId,
        status: Number(status),
      });
      if (code === 0) {
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  }

  const handleClickResetRestCount = async () => {
    const { code, data, message } = await resetRestCount({ id: userId });
    if (code === 0) {
      setTimes(Number(data));
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md 2xl:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("userInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex w-full flex-col gap-4 px-4">
          {agentData?.upUsername && (
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
                {t("upUsername")}
              </Label>
              <span>{agentData.upUsername}</span>
            </div>
          )}
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
              {t("username")}
            </Label>
            <span>{agentData?.username}</span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
              {t("nickname")}
            </Label>
            <span>{agentData?.nickname}</span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
              {t("restCount")}
            </Label>
            <div>{times}</div>
            <Button size="sm" onClick={handleClickResetRestCount}>
              {t("reset")}
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
              {t("status")}
            </Label>
            <Form action="" onSubmit={handleSubmit} ref={ref}>
              <RadioGroup
                defaultValue={agentData?.status.toString()}
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
