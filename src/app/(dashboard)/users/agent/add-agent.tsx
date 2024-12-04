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
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { validateFormData } from "./validata";

export function AddAgent() {
  const t = useTranslations("users.agents");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        {t("addAgent")}
      </Button>
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
  const router = useRouter();
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
      <DialogContent
        className="2xl:max-w-xl lg:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("addAgent")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={ref} action="" onSubmit={handleClickAddAgent}>
          <div className="flex flex-col gap-4 w-full px-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
                  {t("username")}
                </Label>
                <Input
                  placeholder={t("placeholder")}
                  className="flex-1"
                  name="username"
                  defaultValue={""}
                  required
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
              </div>
              <div className="flex gap-4 items-center">
                <Label className=" w-[120px] text-end shrink-0" />
                <div className="flex-1 text-xs text-destructive">
                  {t("usernameWarning")}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
                {t("nickname")}
              </Label>
              <Input
                placeholder={t("placeholder")}
                className="flex-1"
                name="nickname"
                required
                defaultValue={""}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
                  {t("password")}
                </Label>
                <Password
                  type="password"
                  required
                  className="flex-1"
                  placeholder={t("placeholder")}
                  name="password"
                  defaultValue={""}
                  onBlur={(e) => {
                    e.target.reportValidity();
                  }}
                />
              </div>
              <div className="flex gap-4 items-center">
                <Label className="w-[120px] text-end shrink-0" />
                <div className="flex-1 text-xs text-destructive">
                  {t("passwordWarning")}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-[120px] text-right text-muted-foreground">
                {t("confirmPassword")}
              </Label>
              <Password
                type="password"
                required
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
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
