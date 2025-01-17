"use client";
import { bindGoogleAuth, unbindGoogleAuth } from "@/api";
import { Apple } from "@/components/icons/apple";
import { GooglePlay } from "@/components/icons/google";
import { InfoFilled } from "@/components/icons/info";
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
import { Copy } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useState, useTransition } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";
export function GoogleModal({
  open,
  onOpenChange,
  secret,
  qrcode,
  isOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  secret: string;
  qrcode: string;
  isOpen: boolean;
}) {
  const t = useTranslations("personal.security");
  const translations = useTranslations("");
  const [authCode, setAuthCode] = useState("");
  const isEdit = isOpen;
  const [, copyToClipboard] = useCopyToClipboard();
  const [isPending, startTransition] = useTransition();
  const router = useTransitionRouter();
  const submit = async () => {
    if (!authCode) {
      toast.error(t("inputGoogleCode"));
      return;
    }
    if (isEdit) {
      // 重置
      startTransition(async () => {
        const { code, message } = await unbindGoogleAuth({
          secret,
          code: authCode,
        });
        if (code === 0) {
          toast.success(message);
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    } else {
      // 绑定
      startTransition(async () => {
        const { code, message } = await bindGoogleAuth({
          secret,
          code: authCode,
        });
        if (code === 0) {
          toast.success(message);
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setAuthCode("");
        onOpenChange(o);
      }}
    >
      <DialogContent className="h-[80dvh] max-h-[80dvh] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("editGoogleAuthTitle") : t("googleAuthTitle")}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto py-4">
          {/* Step 1 */}
          {isEdit ? null : (
            <div className="flex justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
                    1
                  </div>
                  <span className="text-sm">{t("step1Title")}</span>
                </div>

                <div className="space-y-4">
                  <div className="text-muted-foreground text-sm">
                    <p className="mb-2 text-xs">{t("step1iOS")}</p>
                    <p className="mb-2 text-xs">{t("step1Android")}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="gap-2 bg-primary text-background"
                      >
                        <Apple className="size-4" />
                        App Store
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 bg-accent-foreground text-background"
                      >
                        <GooglePlay className="size-4" />
                        Google Play
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* QR Code */}
              <div className="mt-10 flex gap-4">
                <div className="text-center">
                  <span className="inline-block border p-4">
                    <QRCodeSVG
                      value={
                        "https://apps.apple.com/jp/app/google-authenticator/id388497605"
                      }
                      className="h-20 w-20"
                    />
                  </span>
                  <p className="mt-2 text-muted-foreground text-xs">
                    {t("iosQRCode")}
                  </p>
                </div>
                <div className="text-center">
                  <span className="inline-block border p-4">
                    <QRCodeSVG
                      value={
                        "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                      }
                      className="h-20 w-20"
                    />
                  </span>
                  <p className="mt-2 text-muted-foreground text-xs">
                    {t("androidQRCode")}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Step 2 */}
          {isEdit ? null : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
                  2
                </div>
                <span className="text-sm">{t("step2Title")}</span>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full">
                    <InfoFilled className="size-4 text-chart-4" />
                  </div>
                  <p className="text-chart-4 text-xs">{t("step2Warning")}</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block border p-4">
                    {qrcode ? (
                      <Image
                        src={qrcode}
                        alt="qrcode"
                        width={100}
                        height={100}
                      />
                    ) : null}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-center">
                  <span className="text-muted-foreground text-xs">
                    {t("secretLabel")}
                  </span>
                  <span className="text-primary text-xs">{secret}</span>
                  <Button
                    variant="ghost"
                    className="size-6"
                    onClick={() => {
                      copyToClipboard(secret);
                      toast.success(t("copySuccess"));
                    }}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Step 3 */}
          <div className="space-y-4">
            {isEdit ? null : (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
                  3
                </div>
                <span className="text-sm">{t("step3Title")}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-4 text-center">
              <Label className="flex gap-1 text-xs before:mr-1 before:text-destructive before:content-['*']">
                <span className="text-muted-foreground">
                  {t("googleCodeLabel")}
                </span>
              </Label>
              <Input
                id="auth-code"
                name="auth-code"
                onChange={(e) => setAuthCode(e.target.value)}
                value={authCode}
                placeholder={t("placeholder")}
                className="max-w-[240px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button type="submit" onClick={submit} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
