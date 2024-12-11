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
import { useTransition } from "react";
import { toast } from "sonner";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const router = useRouter();
  const handleConfirm = async () => {
    const _res = await addCollectionAddress({ size: 1 });
    if (_res.code === 0) {
      router.refresh();
      toast.success(t("addSuccess"));
      onOpenChange(false);
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
          <AlertDialogAction
            onClick={() => startTransition(handleConfirm)}
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
