"use client";

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
import { Password } from "@/components/ui/password";
import type { Res } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function GoogleValidataModal({
  open,
  setOpen,
  id,
  fn
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string | "";
  fn: (data: { id: string; code: string }) => Promise<Res<{ code: number; message: string }>>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const t = useTranslations();
  const [isPeding, startTransition] = useTransition();
  const router = useTransitionRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const googleCode = formData.get("googleCode") as string;
    const id = formData.get("id") as string;
    startTransition(async () => {
      const { code, message } = await fn({
        id,
        code: googleCode,
      });
      if (code === 0) {
        toast.success(message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("google2fa")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={ref} action="" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>{t("google2faCode")}</Label>
              <Password type="password" name="googleCode" />
            </div>
          </div>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button
            disabled={isPeding}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {isPeding && <Loader2 className="animate-spin" />}
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
