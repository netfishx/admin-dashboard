"use client";
import { removeOreFee } from "@/api";
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
import type { OreFeeList } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function RemoveBtn({ data }: { data: OreFeeList }) {
  return <RemoveButton data={data} />;
}

// 移除
function RemoveButton({ data }: { data: OreFeeList }) {
  const t = useTranslations("fund.orefee");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isPending) {
      router.push("?loading=true");
    } else {
      router.push("?loading=false");
    }
  }, [isPending]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} size="sm">
          {t("remove")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("removeDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await removeOreFee({
                  address: data.address,
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
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
