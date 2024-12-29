"use client";
import { clearAudit } from "@/api";
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
import type { AuditList } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function CleanBtn({ data }: { data: AuditList }) {
  return (
    <div>
      {data.status === 0 ? <CleanButton data={data} /> : <span> -- </span>}
    </div>
  );
}

// 锁定
function CleanButton({ data }: { data: AuditList }) {
  const t = useTranslations("withdraw.audit");
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
          className="text-primary hover:text-primary/80 px-2 text-sm"
        >
          {isPending ? <Loader2 className="animate-spin" /> : t("clear")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("cleanDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await clearAudit({
                  id: data.id,
                  userId: data.userId,
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
