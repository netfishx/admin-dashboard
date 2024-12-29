"use client";
import { editMaintain } from "@/api";
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
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { type ReactNode, Suspense, useTransition } from "react";
import { toast } from "sonner";

function BatchButton({
  status,
  children,
}: {
  status: number;
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [checked] = useQueryState(
    "checked",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const t = useTranslations();
  const translations = useTranslations("games.maintain");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={status === 0 ? "default" : "destructive"}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {translations("title", {
              status: translations(status === 1 ? "open" : "close"),
            })}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const res = await editMaintain({
                  status,
                  ids: checked,
                });
                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
                }
              })
            }
          >
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function MaintainForm() {
  const t = useTranslations("games.maintain");
  return (
    <div className="bg-background flex items-center justify-end gap-2 p-4">
      <Suspense>
        <BatchButton status={1}>{t("batchOpen")}</BatchButton>
        <BatchButton status={0}>{t("batchClose")}</BatchButton>
      </Suspense>
    </div>
  );
}
