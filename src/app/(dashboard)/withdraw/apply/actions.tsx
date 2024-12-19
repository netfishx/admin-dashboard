"use client";
import {
  ackWithdrawAccount,
  againApply,
  auditWithdrawRecord,
  lockApply,
} from "@/api";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ApplyData } from "@/lib/types";
import { withdrawFlowDataAtom, withdrawFlowDialogAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function Actions({
  data,
  currentUserId,
}: {
  data: ApplyData;
  currentUserId: string;
}) {
  return <ActionButtons data={data} currentUserId={currentUserId} />;
}

function ActionButtons({
  data,
  currentUserId,
}: {
  data: ApplyData;
  currentUserId: string;
}) {
  const t = useTranslations("withdraw.apply");
  // 审核状态 0未处理 1锁定中 2拒绝 3通过
  // 资金状态 0转账中 1到账 2异常
  // 出金模式 0自动 1手动
  // 未处理——[锁定]
  // 锁定中——[通过]、[拒绝]、[流水]
  // 已通过——自动出金——（无操作）；已通过——手动出金——[确认到账]
  // 已拒绝——（无操作）
  // 到账失败——[再次发起]

  const { approverStatus, withdrawMode, moneyStatus, approverId } = data;
  const [, setOpen] = useAtom(withdrawFlowDialogAtom);
  const [, setFlowData] = useAtom(withdrawFlowDataAtom);

  // 未处理 - 显示锁定按钮
  if (approverStatus === 0) {
    return (
      <div className="flex justify-center">
        <LockButton data={data} />
      </div>
    );
  }

  // 锁定中 - 显示审核按钮
  if (approverStatus === 1) {
    const isCurrentAuditor = currentUserId === approverId;
    return (
      <div className="flex justify-center">
        {isCurrentAuditor && (
          <>
            <PassButton data={data} />
            <RejectButton data={data} />
            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-sm text-primary hover:text-primary/80"
              onClick={() => {
                setFlowData(data);
                setOpen(true);
              }}
            >
              {t("flow")}
            </Button>
          </>
        )}
      </div>
    );
  }

  // 手动出金中 - 显示确认按钮
  if (moneyStatus === 0 && withdrawMode === 1) {
    return (
      <div className="flex justify-center">
        <ConfirmButton data={data} />
      </div>
    );
  }

  // 出金异常 - 显示重试按钮
  if (moneyStatus === 2) {
    return (
      <div className="flex justify-center">
        <AgainButton data={data} />
      </div>
    );
  }
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
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
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
function PassButton({
  data,
}: {
  data: ApplyData;
}) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [withdrawMode, setWithdrawMode] = useState("0");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("pass")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("approverDesc")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex items-center py-4">
          <Label className="mr-4 w-20 text-right">
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
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
            disabled={isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 拒绝
function RejectButton({
  data,
}: {
  data: ApplyData;
}) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("reject")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("rejectDesc")}</AlertDialogTitle>
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
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("again")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("flowDesc")}</AlertDialogTitle>
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

// 确认到账
function ConfirmButton({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("confirm")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await ackWithdrawAccount({
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
