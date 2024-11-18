"use client";
import { lockCollectionAddress } from "@/api";
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
import type { CollectionAddressListRecords } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CollectionAddressStatus } from "./defiend";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  item: CollectionAddressListRecords;
}

export function StopDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const handleConfirm = async () => {
    await lockCollectionAddress({
      address: props.item.address,
      status: CollectionAddressStatus.DISABLE,
    });
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("stopTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("stopDesc")}</AlertDialogDescription>
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
