"use client";

import { getGuandanReportListDetail } from "@/api";
import { ModalPagination } from "@/components/modal-pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import type { BombDetailRecords, GameRecordRequestParams } from "@/lib/types";
import {
  orderListBombDetailRecordAtom,
  orderListGuandanBombDetailDialogAtom,
  orderListGuandanDetailDialogAtom,
  orderListGuandanDetailItemAtom,
} from "@/store";
import { format } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

export function OrderDetailDialog() {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const item = useAtomValue(orderListGuandanDetailItemAtom);
  const [, setOpenBomb] = useAtom(orderListGuandanBombDetailDialogAtom);
  const [, setOrderListBombDetailRecord] = useAtom(
    orderListBombDetailRecordAtom,
  );
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<BombDetailRecords[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (open) {
      setLoading(true);
      getGuandanReportListDetail({
        issueNumber: item?.id,
        pageNum,
        pageSize,
      } as GameRecordRequestParams).then(({ data }) => {
        setLoading(false);
        if (data?.list) {
          setData(data?.list || []);
          setTotal(data.total);
          setPageNum(data.pageNum);
          setPageSize(data.pageSize);
        }
      });
    }
  }, [open, pageNum, pageSize]);

  function handleBombDetail(item: BombDetailRecords) {
    setOpenBomb(true);
    setOrderListBombDetailRecord(item.details);
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="max-w-5xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("orderListDetail")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-[150px]">{t("serialNumber")}</TableHead>
                <TableHead className="w-[200px]">{t("issueNumber")}</TableHead>
                <TableHead className="w-[150px]">{t("bombNumber")}</TableHead>
                <TableHead className="w-[150px]">{t("startTime")}</TableHead>
                <TableHead className="w-[150px]">{t("detail")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody className="table w-full">
                {data?.length > 0 ? (
                  data?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-[150px]">{index}</TableCell>
                      <TableCell className="w-[200px]">{item.id}</TableCell>
                      <TableCell className="w-[150px]">
                        {item.bombCount}
                      </TableCell>
                      <TableCell className="w-[150px]">
                        {format(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
                      </TableCell>
                      <TableCell className="w-[150px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 text-sm px-2"
                          onClick={() => handleBombDetail(item)}
                        >
                          {t("more")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="w-full justify-center flex items-center">
                    <TableCell className="text-center h-40 flex items-center justify-center">
                      {translation("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
        <ModalPagination
          total={total}
          currentPage={pageNum}
          size={pageSize}
          setPage={setPageNum}
          setSize={setPageSize}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => setOpen(false))}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
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
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
