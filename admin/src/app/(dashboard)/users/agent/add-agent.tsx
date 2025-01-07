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
import type { AddAgents } from "@/lib/types";
import { addAgentLoadingAtom } from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { useEffect, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { validateFormData } from "./validata";

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
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const ref = useRef<HTMLFormElement>(null);
  const router = useTransitionRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const setAddAgentLoading = useSetAtom(addAgentLoadingAtom);
  useEffect(() => {
    setAddAgentLoading(isPending);
  }, [isPending, setAddAgentLoading]);
  const handleClickAddAgent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await validateFormData(formData);
    if (result.success) {
      setIsLoading(true);
      const { code, message } = await addAgent(result.data as AddAgents);
      setIsLoading(false);
      if (code === 0) {
        onOpenChange(false);
        startTransition(async () => {
          router.refresh();
        });
      } else {
        toast.error(message);
      }
    } else {
      toast.error(result.errors?.[0]?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={ref} action="" onSubmit={handleClickAddAgent}>
          <div className="flex w-full flex-col gap-4 px-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-20 shrink-0 text-right">
                  {t("username")}
                </Label>
                <Input
                  placeholder={t("placeholder")}
                  className="flex-1"
                  name="username"
                  defaultValue={""}
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-20 shrink-0 text-end" />
                <div className="text-destructive flex-1 text-xs">
                  {t("usernameWarning")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground w-20 shrink-0 text-right">
                {t("nickname")}
              </Label>
              <Input
                placeholder={t("placeholder")}
                className="flex-1"
                name="nickname"
                defaultValue={""}
                maxLength={20}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-20 shrink-0 text-right">
                  {t("password")}
                </Label>
                <Password
                  type="password"
                  className="flex-1"
                  placeholder={t("placeholder")}
                  name="password"
                  defaultValue={""}
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-20 shrink-0 text-end" />
                <div className="text-destructive flex-1 text-xs">
                  {t("passwordWarning")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground w-20 shrink-0 text-right">
                {t("confirmPassword")}
              </Label>
              <Password
                type="password"
                className="flex-1"
                placeholder={t("placeholder")}
                name="confirmPassword"
                defaultValue={""}
                onBlur={(e) => {
                  e.target.reportValidity();
                }}
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
