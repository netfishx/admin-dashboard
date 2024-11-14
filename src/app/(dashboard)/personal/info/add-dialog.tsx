"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
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
              <div>123</div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("qrCode")}
              </div>
              <div>
                <Image
                  src="/images/qrcode.png"
                  alt="qrcode"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("depositAddress")}
              </div>
              <div>Oxaaa7272727278</div>
            </div>
            <div className="text-center flex gap-2 items-start mb-6">
              <div className="min-w-[120px] text-muted-foreground text-end">
                {t("tips03")}
              </div>
              <div className="text-left">{t("tips04")}</div>
            </div>
          </div>
          {/* <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {translations("cancel")}
            </Button>
            <Button onClick={() => onOpenChange(false)}>{t("verify")}</Button>
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
