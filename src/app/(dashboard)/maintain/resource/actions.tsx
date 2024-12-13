"use client";

import { deleteBackgroundImage } from "@/api";
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
import type { BackgroundImageList } from "@/lib/types";
import { backgroundImageDataAtom, backgroundImageDialogAtom } from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function Actions({ data }: { data: BackgroundImageList }) {
  const t = useTranslations("maintain.resource");
  const setOpen = useSetAtom(backgroundImageDialogAtom);
  const setData = useSetAtom(backgroundImageDataAtom);
  return (
    <>
      <Button
        variant="ghost"
        className="text-sm text-primary hover:text-primary/80"
        size="sm"
        onClick={() => {
          setOpen(true);
          setData(data);
        }}
      >
        {t("edit")}
      </Button>
      <DeleteBtn id={data.id} />
    </>
  );
}

function DeleteBtn({ id }: { id: string }) {
  const translation = useTranslations();
  const t = useTranslations("maintain.resource");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="text-sm text-gray-500">{t("deleteDesc")}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>{translation("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const { code, message } = await deleteBackgroundImage({
                  id,
                });
                if (code === 0) {
                  router.refresh();
                } else {
                  toast.error(message);
                }
              })
            }
          >
            {translation("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
