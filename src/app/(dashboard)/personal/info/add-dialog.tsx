"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserBasicInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserBasicInfo;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange, data } = props;
  const t = useTranslations("personal.info");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{t("google2fa")}</DialogTitle>
          </DialogHeader>
          <div className="max-w-xl w-full mx-auto p-4">
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("mainNet")}
              </div>
              <div>{data?.majorNetwork}</div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("qrCode")}
              </div>
              <div>
                <QRCodeSVG value={data?.rechargeAddress} />
              </div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("depositAddress")}
              </div>
              <div>{data?.rechargeAddress}</div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("tips03")}
              </div>
              <div className="text-left">{t("tips04")}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
