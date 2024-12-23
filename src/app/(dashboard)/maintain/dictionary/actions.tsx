"use client";

import { getDictionaryItemList } from "@/api";
import {} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { DictionaryList } from "@/lib/types";
import {
  deleteDictionaryItemDialogAtom,
  dictionaryDataAtom,
  dictionaryItemDataAtom,
  dictionaryItemDialogAtom,
  editDictionaryDialogAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

export function Actions({ data }: { data: DictionaryList }) {
  const t = useTranslations("maintain.dictionary");
  const setData = useSetAtom(dictionaryDataAtom);
  const setOpen = useSetAtom(editDictionaryDialogAtom);
  const setOpenItem = useSetAtom(dictionaryItemDialogAtom);
  const setList = useSetAtom(dictionaryItemDataAtom);

  const [isPending, startTransition] = useTransition();
  const setOpenDelete = useSetAtom(deleteDictionaryItemDialogAtom);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-primary hover:text-primary/80"
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
        disabled={isPending}
        className="text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startTransition(async () => {
            const res = await getDictionaryItemList({
              dictCode: data.dictCode,
            });
            if (res.code === 0) {
              const key = "zh-CN";
              setList(res.data?.[key] ?? []);
              setData(data);
              setOpenItem(true);
            } else {
              toast.error(res.message);
            }
          });
        }}
      >
        {isPending ? <Loader2 className="animate-spin" /> : null}
        {t("dictSetting")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-destructive hover:text-destructive/80"
        onClick={() => {
          setData(data);
          setOpenDelete(true);
        }}
      >
        {t("delete")}
      </Button>
    </>
  );
}
