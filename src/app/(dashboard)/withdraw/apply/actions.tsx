"use client";
import { againApply, auditWithdrawRecord, lockApply } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ApplyData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function Actions({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const auditStatus = data.approverStatus;
  const withdrawMode = data.withdrawMode;
  const moneyStatus = data.moneyStatus;

  return (
    <>
      <div className="flex justify-center">
        {/* 未处理——[锁定]
        锁定中——[通过]、[拒绝]、[流水]
        已通过——自动出金——（无操作）；已通过——手动出金——[确认到账] 
        已拒绝——（无操作）
        到账失败——[再次发起]
        */}
        {/* todo: 锁定人和当前登录id不一致时 通过拒绝按钮的置灰 */}
        {auditStatus === 0 && <LockButton data={data} />}
        {auditStatus === 1 && (
          <>
            <PassButton data={data} />
            <RejectButton data={data} />
            <Button
              variant="link"
              className="hover:no-underline hover:text-primary/80 px-0"
            >
              {t("flow")}
            </Button>
          </>
        )}
        {auditStatus === 2 && withdrawMode === 1 && (
          <Button
            variant="link"
            className="hover:no-underline hover:text-primary/80 px-0"
          >
            {t("confirm")}
          </Button>
        )}
        {moneyStatus === 2 && <AgainButton data={data} />}
        {(auditStatus === 2 || (auditStatus === 3 && moneyStatus !== 2)) && (
          <span>--</span>
        )}
        {/* <WithdrawModeDialog data={data} /> */}
      </div>
    </>
  );
}

// 锁定
function LockButton({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" disabled={isPending} className="px-2">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("lock")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("lockDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await lockApply({
                  id: data.id,
                });

                if (code === 0) {
                  toast.success(message);
                  router.refresh();
                } else {
                  toast.error(message);
                }
              });
            }}
          >
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 通过
function PassButton({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [withdrawMode, setWithdrawMode] = useState("0");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" disabled={isPending} className="px-2">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("pass")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("approverDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="flex items-center py-4">
          <Label className="w-20 text-right mr-4">
            <span className="text-destructive">*</span>
            {t("withdrawMode")}
          </Label>
          <RadioGroup
            defaultValue="0"
            className="flex gap-2"
            value={withdrawMode}
            onValueChange={(value) => setWithdrawMode(value)}
          >
            <span className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="0" />
              <Label htmlFor="0">{t("auto")}</Label>
            </span>
            <span className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1">{t("manual")}</Label>
            </span>
          </RadioGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await auditWithdrawRecord({
                  id: data.id,
                  approverStatusEnum: 3,
                  modeEnum: Number(withdrawMode),
                });

                if (code === 0) {
                  toast.success(message);
                  router.refresh();
                } else {
                  toast.error(message);
                }
              });
            }}
          >
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 拒绝
function RejectButton({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" disabled={isPending} className="px-2">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t("reject")
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("approverDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await auditWithdrawRecord({
                  id: data.id,
                  approverStatusEnum: 2,
                });

                if (code === 0) {
                  toast.success(message);
                  router.refresh();
                } else {
                  toast.error(message);
                }
              });
            }}
          >
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 再次发起
function AgainButton({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" disabled={isPending} className="px-2">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t("again")
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("approverDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await againApply({
                  id: data.id,
                });

                if (code === 0) {
                  toast.success(message);
                  router.refresh();
                } else {
                  toast.error(message);
                }
              });
            }}
          >
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
