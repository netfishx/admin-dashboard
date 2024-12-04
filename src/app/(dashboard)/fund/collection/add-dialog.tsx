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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const [loading, setLoading] = useState(false);
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const router = useRouter();
  const handleConfirm = async () => {
    setLoading(true);
    const _res = await addCollectionAddress({ size: 1 });
    onOpenChange(false);
    setLoading(false);

    if (_res.code === 0) {
      router.refresh();
    }
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
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
