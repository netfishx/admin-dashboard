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
import { useTranslations } from "next-intl";
import { useState } from "react";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
export function GoogleModal({
  open,
  onOpenChange,
  secret,
  qrcode,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  secret: string;
  qrcode: string;
}) {
  const t = useTranslations("personal.security");
  const translations = useTranslations("");
  const [authCode, setAuthCode] = useState("");
  const isEdit = false;

  const submit = async () => {
    if (isEdit) {
      // 重置
      const { code, message } = await unbindGoogleAuth({
        secret,
        code: authCode,
      });
    } else {
      // 绑定
      const { code, message } = await bindGoogleAuth({
        secret,
        code: authCode,
      });
    }

    console.info("绑定成功");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("editGoogleAuthTitle") : t("googleAuthTitle")}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Step 1 */}
          {isEdit ? null : (
            <div className="flex gap-8 justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
                    1
                  </div>
                  <span>{t("step1Title")}</span>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
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
                        className="gap-2 text-background bg-accent-foreground"
                      >
                        <GooglePlay className="size-4" />
                        Google Play
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* QR Code */}
              <div className="flex gap-4 mt-10">
                <div className="text-center">
                  <span className="border p-4 inline-block">
                    <QRCodeSVG value={""} className="w-20 h-20" />
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("iosQRCode")}
                  </p>
                </div>
                <div className="text-center">
                  <span className="border p-4 inline-block">
                    <QRCodeSVG value={""} className="w-20 h-20" />
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">
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
                <span>{t("step2Title")}</span>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-4 w-4 rounded-full">
                    <InfoFilled className="size-4 text-chart-4" />
                  </div>
                  <p className="text-sm text-chart-4">{t("step2Warning")}</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="border p-4 inline-block">
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
                <div className="mt-4 text-center">
                  <span className="text-sm text-muted-foreground">
                    {t("secretLabel")}
                  </span>
                  <span className="text-sm text-primary">{secret}</span>
                  <Button variant="link" className="h-auto p-0 pl-2 text-sm">
                    {t("copy")}
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
                <span>{t("step3Title")}</span>
              </div>
            )}
            <div className="space-y-2 flex items-center gap-4 justify-center">
              <Label htmlFor="auth-code" className="text-sm text-destructive">
                {t("googleCodeLabel")}
              </Label>
              <Input
                id="auth-code"
                name="auth-code"
                onChange={(e) => setAuthCode(e.target.value)}
                value={authCode}
                placeholder={t("placeholder")}
                className="max-w-[240px] bg-muted/50"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button type="submit" onClick={submit}>
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
