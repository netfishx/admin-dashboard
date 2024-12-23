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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { CollectionAddressStatus } from "./defiend";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  item: CollectionAddressListRecords;
}

export function UnlockDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleConfirm = () => {
    startTransition(async () => {
      const res = await lockCollectionAddress({
        address: props.item.address,
        status: CollectionAddressStatus.ENABLE,
      });
      if (res.code === 0) {
        toast.success(res.message);
        router.refresh();
        onOpenChange(false);
      }
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("unlockTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("unlockDesc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
