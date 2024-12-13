import { getGoogleQrCode, getSecurityList } from "@/api";
import { cn } from "@/lib/utils";
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
  // 获取列表 type 0 谷歌  1 资金密码
  const { data: list } = await getSecurityList();
  const showGoogle = list?.find((item) => item.type === 0);
  const showMoney = list?.find((item) => item.type === 1);

  // 已开启的安全项数量
  const enabledCount =
    Number(showGoogle?.isOpen && permissions.includes("google_code") ? 1 : 0) +
    Number(
      showMoney?.isOpen && permissions.includes("money_password") ? 1 : 0,
    ) +
    1;

  // 总的安全项数量
  const totalCount = ["google_code", "money_password", "edit_password"].filter(
    (perm) => permissions.includes(perm),
  ).length;

  const percent = Math.floor((enabledCount / totalCount) * 100);

  return (
    <>
      <SecurityProgress value={percent} />
      <div className="flex flex-1 flex-col gap-4 bg-background p-4">
        {permissions.includes("edit_password") && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">
                  {t("loginPassword")}
                </span>
                <CheckCircle2 className="h-5 w-5 text-chart-5" />
                <span className="mt-1 text-sm text-muted-foreground">
                  {t("loginPasswordDes")}
                </span>
              </div>
            </div>
            <div>
              <PasswordBtn />
            </div>
          </div>
        )}

        {permissions.includes("google_code") && showGoogle && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">
                  {t("googleVerification")}
                </span>
                <CheckCircle2
                  className={cn(
                    "h-5 w-5",
                    showGoogle?.isOpen
                      ? "text-chart-5"
                      : "text-muted-foreground",
                  )}
                />
                <span className="mt-1 text-sm text-muted-foreground">
                  {t("googleVerificationDes")}
                </span>
              </div>
            </div>
            {!showGoogle?.isOpen && (
              <GoogleBtn
                secret={secret ?? ""}
                qrcode={qrcode ?? ""}
                isOpen={showGoogle?.isOpen}
              />
            )}
          </div>
        )}

        {permissions.includes("money_password") && showMoney && (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-24">
                <span className="text-sm font-medium">{t("fundPassword")}</span>
                <CheckCircle2
                  className={cn(
                    "h-5 w-5",
                    showMoney?.isOpen
                      ? "text-chart-5"
                      : "text-muted-foreground",
                  )}
                />
                <span className="mt-1 text-sm text-muted-foreground">
                  {t("fundPasswordDes")}
                </span>
              </div>
            </div>
            <MoneyBtn isOpen={showMoney?.isOpen} />
          </div>
        )}
      </div>
    </>
  );
}
