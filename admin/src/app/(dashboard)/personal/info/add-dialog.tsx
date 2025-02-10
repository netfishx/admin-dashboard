import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { UserBasicInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import CopyButton from "../../fund/collection/copy-button";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  data?: UserBasicInfo;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange, data } = props;
  const t = useTranslations("personal.info");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("recharge")}</DialogTitle>
          <DialogDescription className="text-destructive">
            {t("notice")}
            {t("onlyAK")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 text-sm">
          <div className="flex items-center gap-2">
            <Label className="w-20 text-end text-muted-foreground">
              {t("mainNet")}
            </Label>
            <div>{data?.majorNetwork}</div>
          </div>
          <div className="flex items-start gap-2">
            <Label className="w-20 text-end text-muted-foreground">
              {t("qrCode")}
            </Label>
            <div>
              <QRCodeSVG value={data?.rechargeAddress ?? ""} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-20 text-end text-muted-foreground">
              {t("depositAddress")}
            </Label>
            <div className="flex items-center">
              {data?.rechargeAddress}
              <CopyButton address={data?.rechargeAddress ?? ""} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
