"use client";
import { deleteSubaccount } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { subaccountDeleteAtom, subaccountDeleteDialogAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useTransition } from "react";
import { toast } from "sonner";

export function SubaccountDelete() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const translations = useTranslations("system.subaccount");
  const id = useAtomValue(subaccountDeleteAtom);
  const [open, setOpen] = useAtom(subaccountDeleteDialogAtom);
  const router = useTransitionRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {translations("delete")}
            {translations("title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {translations("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                if (!id) {
                  return;
                }
                const res = await deleteSubaccount({
                  id,
                });
                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
                }
              });
            }}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
