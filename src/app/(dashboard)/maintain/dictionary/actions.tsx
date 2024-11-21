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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { DictionaryList } from "@/lib/types";
import {
  dictionaryDataAtom,
  dictionaryItemDialogAtom,
  editDictionaryDialogAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function Actions({ data }: { data: DictionaryList }) {
  const t = useTranslations("maintain.dictionary");
  const setData = useSetAtom(dictionaryDataAtom);
  const setOpen = useSetAtom(editDictionaryDialogAtom);
  const setOpenItem = useSetAtom(dictionaryItemDialogAtom);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm px-2"
        onClick={() => {
          setData(data);
          setOpen(true);
        }}
      >
        {t("edit")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm px-2"
        onClick={() => {
          setData(data);
          setOpenItem(true);
        }}
      >
        {t("dictSetting")}
      </Button>
      <DeleteBtn data={data} />
    </>
  );
}

function DeleteBtn({ data }: { data: DictionaryList }) {
  const translation = useTranslations();
  const t = useTranslations("maintain.dictionary");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80 text-sm px-2"
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
                const res = await deleteDictionary({
                  id: data.id,
                });
                if (res.code === 0) {
                  router.refresh();
                } else {
                  toast.error(res.message);
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
