"use client";
import { addCollectionAddress } from "@/api";
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
import { collectionAddressDialogAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useTransition } from "react";
import { toast } from "sonner";

export function AddDialog() {
  const [open, setOpen] = useAtom(collectionAddressDialogAtom);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const router = useTransitionRouter();
  const handleConfirm = async () => {
    const { code, message } = await addCollectionAddress({ size: 1 });
    if (code === 0) {
      router.refresh();
      toast.success(message);
      setOpen(false);
    } else {
      toast.error(message);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("addDesc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => startTransition(handleConfirm)}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
