import { getGoogleQrCode } from "@/api";
import { getSession } from "@/session";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GoogleBtn } from "./google-btn";
import { MoneyBtn } from "./money-btn";
import { PasswordBtn } from "./password-btn";
import { SecurityProgress } from "./progress";

export async function List() {
  const t = await getTranslations("personal.security");
  const res = await getGoogleQrCode();
  const { secret, qrcode } = res.data ?? {};
  const session = await getSession();
  const permissions = session?.permissions ?? [];

  return (
    <>
      <SecurityProgress value={33} />
      <div className="flex-1 flex flex-col gap-4 bg-background py-2 px-4">
        {permissions.includes("edit_password") && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">
                  {t("loginPassword")}
                </span>
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
        )}

        {permissions.includes("google_code") && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">
                  {t("googleVerification")}
                </span>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mt-1">
                  {t("googleVerificationDes")}
                </span>
              </div>
            </div>
            <GoogleBtn secret={secret ?? ""} qrcode={qrcode ?? ""} />
          </div>
        )}

        {permissions.includes("money_password") && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">{t("fundPassword")}</span>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mt-1">
                  {t("fundPasswordDes")}
                </span>
              </div>
            </div>
            <MoneyBtn />
          </div>
        )}
      </div>
    </>
  );
}
