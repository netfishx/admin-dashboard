"use client";

import { getGuandanReportListDetail } from "@/api";
import { ModalPagination } from "@/components/modal-pagination";
import { Time } from "@/components/time";
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
import type { BombDetailRecords } from "@/lib/types";
import {
  guandanBombDetailAtom,
  guandanOrderIdAtom,
  orderListGuandanBombDetailDialogAtom,
  orderListGuandanDetailDataAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

export function OrderDetailDialog() {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const setOpenBombDialog = useSetAtom(orderListGuandanBombDetailDialogAtom);
  const setGuandanBombDetail = useSetAtom(guandanBombDetailAtom);
  const id = useAtomValue(guandanOrderIdAtom);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useAtom(orderListGuandanDetailDataAtom);

  function handleBombDetail(item: BombDetailRecords) {
    setGuandanBombDetail(item.details);
    setOpenBombDialog(true);
  }

  function handleChange({
    pageNum,
    pageSize,
  }: {
    pageNum: number;
    pageSize: number;
  }) {
    startTransition(async () => {
      const { code, data, message } = await getGuandanReportListDetail({
        issueNumber: id,
        pageNum,
        pageSize,
      });
      if (code === 0 && data) {
        setData(data);
      } else {
        toast.error(message);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("orderListDetail")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="rounded-sm border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-20">{t("serialNumber")}</TableHead>
                <TableHead className="w-40">{t("issueNumber")}</TableHead>
                <TableHead className="w-20">{t("bombNumber")}</TableHead>
                <TableHead className="w-40">{t("startTime")}</TableHead>
                <TableHead className="w-20 text-center">
                  {t("detail")}
                </TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody>
                {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
                {data?.list?.length ? (
                  data?.list?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.bombCount}</TableCell>
                      <TableCell>
                        <Time time={item.createdAt} />
                      </TableCell>
                      <TableCell className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 px-2 text-sm"
                          onClick={() => handleBombDetail(item)}
                        >
                          {t("more")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="flex w-full items-center justify-center">
                    <TableCell className="flex h-40 items-center justify-center text-center">
                      {translation("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
        {!!data?.total && (
          <ModalPagination total={data.total} onChange={handleChange} />
        )}
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

function ChangeLogSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={i}>
          <TableCell colSpan={7}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
