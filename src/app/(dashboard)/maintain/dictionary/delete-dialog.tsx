"use client";

import { deleteDictionary } from "@/api";
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
import { deleteDictionaryItemDialogAtom, dictionaryDataAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteDialog() {
  const t = useTranslations("maintain.dictionary");
  const translation = useTranslations();
  const [deletePending, startTransitionDelete] = useTransition();
  const router = useRouter();

  const [open, setOpen] = useAtom(deleteDictionaryItemDialogAtom);
  const data = useAtomValue(dictionaryDataAtom);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="text-sm text-muted-foreground">{t("deleteDesc")}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>{translation("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={deletePending}
            onClick={() =>
              startTransitionDelete(async () => {
                const res = await deleteDictionary({
                  id: data?.id ?? "",
                });
                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
                }
              })
            }
          >
            {deletePending ? <Loader2 className="animate-spin" /> : null}
            {translation("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
