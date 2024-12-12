"use client";

import { getChangeLog } from "@/api";
import { ModalPagination } from "@/components/modal-pagination";
import { Time } from "@/components/time";
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
  ScrollableTable,
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
  }, [open, targetUserId, appType, pageNum, pageSize]);
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
        <div className="border rounded-sm overflow-auto max-h-[50dvh]">
          <ScrollableTable className="relative">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0">
                <TableHead>{t("operateTime")}</TableHead>
                <TableHead>{t("operater")}</TableHead>
                <TableHead>{t("username")}</TableHead>
                <TableHead>{t("ip")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("operateType")}</TableHead>
                <TableHead>{t("operateDesc")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody>
                {data?.list?.length > 0 ? (
                  data?.list?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Time time={item.createTime} />
                      </TableCell>
                      <TableCell>{item.userNickName}</TableCell>
                      <TableCell>{item.userName}</TableCell>
                      <TableCell>{item.remoteIp}</TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.bizType}</TableCell>
                      <TableCell>{item.msg}</TableCell>
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
          </ScrollableTable>
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
