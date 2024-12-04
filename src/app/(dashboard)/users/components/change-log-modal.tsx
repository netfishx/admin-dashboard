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
import type { ChangeLog } from "@/lib/types";
import { changeLogModalAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function ChangeLogModal({
  targetUserId,
  appType,
}: { targetUserId: string; appType: "AGENT" | "MEMBER" }) {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [open, setOpen] = useAtom(changeLogModalAtom);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<{ list: ChangeLog[] }>({ list: [] });

  useEffect(() => {
    if (targetUserId && open) {
      setLoading(true);
      getChangeLog({
        targetUserId,
        appType,
        pageNum,
        pageSize,
      }).then(({ code, data, message }) => {
        setLoading(false);
        if (code === 0 && data) {
          setData(data);
          setTotal(data.total);
          setPageNum(data.pageNum);
          setPageSize(data.pageSize);
        } else {
          toast.error(message);
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
          <DialogTitle>{t("changeLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-[150px]">{t("operateTime")}</TableHead>
                <TableHead className="w-[100px]">{t("operater")}</TableHead>
                <TableHead className="w-[100px]">{t("username")}</TableHead>
                <TableHead className="w-[150px]">{t("ip")}</TableHead>
                <TableHead className="w-[150px]">{t("address")}</TableHead>
                <TableHead className="w-[100px]">{t("operateType")}</TableHead>
                <TableHead className="flex-1">{t("operateDesc")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody className="w-full max-h-[50dvh] overflow-auto block">
                {data?.list?.length > 0 ? (
                  data?.list?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-[150px]">
                        {item.operateTime}
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {item.userNickName}
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {item.userName}
                      </TableCell>
                      <TableCell className="w-[150px]">
                        {item.remoteIp}
                      </TableCell>
                      <TableCell className="w-[150px]">{item.region}</TableCell>
                      <TableCell className="w-[100px]">
                        {item.bizType}
                      </TableCell>
                      <TableCell className="flex-1">{item.msg}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="flex justify-center items-center">
                    <TableCell
                      colSpan={7}
                      className="flex justify-center items-center h-40"
                    >
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
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
