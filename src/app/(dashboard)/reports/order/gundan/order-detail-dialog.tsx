"use client";

import { getChangeLog } from "@/api";
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
import {
  orderListGuandanBombDetailDialogAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

const tempData = {
  list: [
    {
      id: "123",
      serialNumber: "123",
      issueNumber: "123",
      bombNumber: "123",
      startTime: "123",
      settlementTime: "123",
      detail: "123",
    },
  ],
  total: 10,
  pageNum: 1,
  pageSize: 10,
};

export function OrderDetailDialog({
  targetUserId,
  appType,
}: { targetUserId: string; appType: "AGENT" | "MEMBER" }) {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const [, setOpenBomb] = useAtom(orderListGuandanBombDetailDialogAtom);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState(tempData);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (targetUserId && open) {
      setLoading(true);
      getChangeLog({
        targetUserId,
        appType,
        pageNum,
        pageSize,
      }).then(() => {
        setLoading(false);

        if (tempData) {
          setData(tempData);
          setTotal(tempData.total);
          setPageNum(tempData.pageNum);
          setPageSize(tempData.pageSize);
        }
      });
    }
  }, [targetUserId, open, pageNum, pageSize]);
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
                <TableHead className="w-[150px]">{t("issueNumber")}</TableHead>
                <TableHead className="w-[150px]">{t("bombNumber")}</TableHead>
                <TableHead className="w-[150px]">{t("startTime")}</TableHead>
                <TableHead className="w-[150px]">
                  {t("settlementTime")}
                </TableHead>
                <TableHead className="w-[150px]">{t("detail")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody className="table w-full">
                {data?.list?.length > 0 ? (
                  data?.list?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-[150px]">123</TableCell>
                      <TableCell className="w-[150px]">123</TableCell>
                      <TableCell className="w-[150px]">123</TableCell>
                      <TableCell className="w-[150px]">123</TableCell>
                      <TableCell className="w-[150px]">123</TableCell>
                      <TableCell className="w-[150px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 text-sm px-2"
                          onClick={() => setOpenBomb(true)}
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
