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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DictionaryItemList } from "@/lib/types";
import {
  addDictionaryItemDataAtom,
  addDictionaryItemDialogAtom,
  dictionaryDataAtom,
  dictionaryItemDialogAtom,
  dictionaryItemOperationAtom,
} from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { AddItemDialog } from "./add-item";

export function DictSettingModal() {
  const t = useTranslations("maintain.dictionary");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(dictionaryItemDialogAtom);
  const data = useAtomValue(dictionaryDataAtom);
  const [list, setList] = useState<DictionaryItemList[]>([]);
  const [addOpen, setAddOpen] = useAtom(addDictionaryItemDialogAtom);
  const setAddData = useSetAtom(addDictionaryItemDataAtom);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const setOperation = useSetAtom(dictionaryItemOperationAtom);
  useEffect(() => {
    if (data && open && !addOpen && !deleteLoading) {
      setLoading(true);
      getDictionaryItemList({
        dictCode: data.dictCode,
      }).then(({ data }) => {
        console.info(data);
        setList(data ?? []);
        setLoading(false);
      });
    }
  }, [data, open, addOpen, deleteLoading]);
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
          <div className="border rounded-md mt-4">
            <Table>
              <TableHeader className="bg-muted table w-full">
                <TableRow>
                  <TableHead className="w-26">{t("itemName")}</TableHead>
                  <TableHead className="w-26">{t("itemValue")}</TableHead>
                  <TableHead className="w-40">{t("remark")}</TableHead>
                  <TableHead className="w-26">{t("action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="block overflow-auto max-h-[370px]">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <TableRow key={index} className="w-full block">
                        <TableCell
                          colSpan={4}
                          className="text-center w-full block"
                        >
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))
                  : list.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="w-26">{item.label}</TableCell>
                        <TableCell className="w-26">{item.value}</TableCell>
                        <TableCell className="w-40">{item.remark}</TableCell>
                        <TableCell className="w-26">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80 text-sm px-2"
                              onClick={() => {
                                setAddOpen(true);
                                setAddData(item);
                                setOperation("edit");
                              }}
                            >
                              {t("edit")}
                            </Button>
                            <DeleteBtn
                              id={item.id}
                              setDeleteLoading={setDeleteLoading}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
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

function DeleteBtn({
  id,
  setDeleteLoading,
}: { id: string; setDeleteLoading: (loading: boolean) => void }) {
  const translation = useTranslations();
  const t = useTranslations("maintain.dictionary");
  const [isPending, startTransition] = useTransition();
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
            onClick={() => {
              setDeleteLoading(true);
              startTransition(async () => {
                const { code, message } = await deleteDictionaryItem({
                  id,
                });
                if (code === 0) {
                  toast.success(message);
                  setDeleteLoading(false);
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
