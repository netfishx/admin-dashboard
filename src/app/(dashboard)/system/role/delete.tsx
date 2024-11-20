"use client";
import { deleteRole } from "@/api";
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
import { roleDeleteAtom, roleDeleteDialogAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function RoleDelete() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();
  const translations = useTranslations("system.role");
  const id = useAtomValue(roleDeleteAtom);
  const [open, setOpen] = useAtom(roleDeleteDialogAtom);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translations("deleteModal")}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center">
            <span className="text-base">
              {translations("deleteModalDescription")}
            </span>
            <span className="text-destructive text-xs">
              {translations("deleteModalDescriptionWarning")}
            </span>
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
                const res = await deleteRole({
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
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
