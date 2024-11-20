import { getGoogleQrCode } from "@/api";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GoogleBtn } from "./google-btn";
import { MoneyBtn } from "./money-btn";
import { PasswordBtn } from "./password-btn";

export async function List() {
  const t = await getTranslations("personal.security");
  const res = await getGoogleQrCode();
  const { secret, qrcode } = res.data ?? {};

  return (
    <div className="flex justify-between  bg-background py-2 px-4">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-24">
              <span className="text-base">{t("loginPassword")}</span>
              <CheckCircle2 className="h-5 w-5 text-chart-2" />
              <span className="text-sm text-muted-foreground mt-1">
                {t("loginPasswordDes")}
              </span>
            </div>
          </div>
          <div>
            <PasswordBtn />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-24">
              <span className="text-base">{t("googleVerification")}</span>
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mt-1">
                {t("googleVerificationDes")}
              </span>
            </div>
          </div>
          <GoogleBtn secret={secret ?? ""} qrcode={qrcode ?? ""} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-24">
              <span className="text-base">{t("fundPassword")}</span>
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mt-1">
                {t("fundPasswordDes")}
              </span>
            </div>
          </div>
          <MoneyBtn />
        </div>
      </div>
    </div>
  );
}
