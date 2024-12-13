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
import CopyButton from "../../fund/collection/copy-button";

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
      <DialogContent>
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{t("recharge")}</DialogTitle>
          </DialogHeader>
          <div className="mx-auto w-full max-w-xl p-4">
            <div className="mb-6 flex items-start gap-2 text-center">
              <div className="min-w-[80px] text-end text-muted-foreground">
                {t("mainNet")}
              </div>
              <div>{data?.majorNetwork}</div>
            </div>
            <div className="mb-6 flex items-start gap-2 text-center">
              <div className="min-w-[80px] text-end text-muted-foreground">
                {t("qrCode")}
              </div>
              <div>
                <QRCodeSVG value={data?.rechargeAddress} />
              </div>
            </div>
            <div className="mb-6 flex items-start gap-2 text-center">
              <div className="min-w-[80px] text-end text-muted-foreground">
                {t("depositAddress")}
              </div>
              <div className="flex w-[300px] items-center gap-2">
                {data?.rechargeAddress}
                <CopyButton address={data?.rechargeAddress} />
              </div>
            </div>
            <div className="mb-6 flex items-start gap-2 text-center">
              <div className="min-w-[80px] text-end text-muted-foreground">
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
