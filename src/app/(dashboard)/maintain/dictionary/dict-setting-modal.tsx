"use client";

import { deleteDictionaryItem, getDictionaryItemList } from "@/api";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addDictionaryItemDataAtom,
  addDictionaryItemDialogAtom,
  dictionaryDataAtom,
  dictionaryItemDataAtom,
  dictionaryItemDialogAtom,
  dictionaryItemOperationAtom,
} from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { AddItemDialog } from "./add-item";

export function DictSettingModal() {
  const t = useTranslations("maintain.dictionary");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(dictionaryItemDialogAtom);
  const data = useAtomValue(dictionaryDataAtom);
  const [list, setList] = useAtom(dictionaryItemDataAtom);
  const setAddOpen = useSetAtom(addDictionaryItemDialogAtom);
  const setAddData = useSetAtom(addDictionaryItemDataAtom);

  const setOperation = useSetAtom(dictionaryItemOperationAtom);

  const [isPending, startTransition] = useTransition();
  function fetchDictionaryItemList() {
    startTransition(async () => {
      const res = await getDictionaryItemList({
        dictCode: data?.dictCode ?? "",
      });
      if (res.code === 0) {
        const key = "zh-CN";
        setList(res.data?.[key] ?? []);
      } else {
        toast.error(res.message);
      }
    });
  }

  const handleClickAdd = () => {
    if (data?.dictCode) {
      setAddOpen(true);
      setAddData({ id: data.id, dictCode: data.dictCode });
      setOperation("add");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{t("dictSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <div className="flex justify-end">
            <Button size="sm" onClick={handleClickAdd}>
              {t("add")}
            </Button>
          </div>
          <div className="mt-4 max-h-[50dvh] overflow-auto rounded-md border">
            <ScrollableTable className="relative w-full">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="w-26">{t("itemName")}</TableHead>
                  <TableHead className="w-26">{t("itemValue")}</TableHead>
                  <TableHead className="w-40">{t("remark")}</TableHead>
                  <TableHead className="w-26 text-center">
                    {t("action")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isPending ? (
                <TableBodySkeleton />
              ) : (
                <TableBody>
                  {list.length > 0 ? (
                    list.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.remark}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80 px-2 text-sm"
                              onClick={() => {
                                setAddOpen(true);
                                setAddData({
                                  ...item,
                                  dictCode: data?.dictCode ?? "",
                                });
                                setOperation("edit");
                              }}
                            >
                              {t("edit")}
                            </Button>
                            <DeleteBtn
                              id={item.id}
                              onSuccess={fetchDictionaryItemList}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-20 text-center">
                        {translation("noData")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </ScrollableTable>
          </div>
        </div>
        <AddItemDialog />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{translation("cancel")}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>{translation("confirm")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteBtn({ id, onSuccess }: { id: string; onSuccess: () => void }) {
  const translation = useTranslations();
  const t = useTranslations("maintain.dictionary");
  const [deletePending, startTransitionDelete] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80 px-2 text-sm"
          disabled={deletePending}
        >
          {deletePending ? <Loader2 className="animate-spin" /> : null}
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="text-muted-foreground text-sm">{t("deleteDesc")}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>{translation("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransitionDelete(async () => {
                const { code, message } = await deleteDictionaryItem({
                  id,
                });
                if (code === 0) {
                  toast.success(message);
                  onSuccess();
                }
              });
            }}
          >
            {translation("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={4} className="text-center">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
