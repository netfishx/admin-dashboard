"use client";
import { addOreFee } from "@/api";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

export function AddBtn() {
  const t = useTranslations("fund.orefee");

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      <div className="flex gap-4 justify-between items-center">
        {t("feeManagement")}
        <div className="flex gap-2 items-center">
          <AddButton />
        </div>
      </div>
    </div>
  );
}

// 添加
function AddButton() {
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
        <Button disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("add")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addDesc")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                const { code, message } = await addOreFee({
                  size: 1,
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
