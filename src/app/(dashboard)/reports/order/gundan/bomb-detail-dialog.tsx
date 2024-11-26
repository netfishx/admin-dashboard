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
import { orderListGuandanBombDetailDialogAtom } from "@/store";
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

export function BombDetailDialog({
  targetUserId,
  appType,
}: { targetUserId: string; appType: "AGENT" | "MEMBER" }) {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanBombDetailDialogAtom);
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
          <DialogTitle>炸弹详情</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-[150px]">会员ID</TableHead>
                <TableHead className="w-[150px]">炸数</TableHead>
                <TableHead className="w-[150px]">分数</TableHead>
                <TableHead className="w-[150px]">名次</TableHead>
                <TableHead className="w-[150px]">贡献</TableHead>
                <TableHead>手牌</TableHead>
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
                      <TableCell>123</TableCell>
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
