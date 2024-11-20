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
import { useTranslations } from "next-intl";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const handleConfirm = async () => {
    await addCollectionAddress({ size: 1 });
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("addDesc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
