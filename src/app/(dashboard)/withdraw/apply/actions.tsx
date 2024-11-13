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
import type { ApplyData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function Actions({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  console.info(data);
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
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("lock")}
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
                console.info("锁定提款申请", data.id);
                const res = await lockApply({
                  id: data.id,
                });

                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" disabled={isPending} className="px-2">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("pass")}
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
                console.info("通过提款申请", data.id);
                const res = await auditWithdrawRecord({
                  id: data.id,
                  approverStatusEnum: 3,
                });

                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
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
                console.info("拒绝提款申请", data.id);
                const res = await auditWithdrawRecord({
                  id: data.id,
                  approverStatusEnum: 2,
                });

                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
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
                console.info("再次发起提款申请", data.id);
                const res = await againApply({
                  id: data.id,
                });

                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
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
