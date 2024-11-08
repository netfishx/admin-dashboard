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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ChangeLog } from "@/lib/types";
import { agentIdAtom, changeLogModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ChangeLogModal() {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [open, setOpen] = useAtom(changeLogModalAtom);
  const targetUserId = useAtomValue(agentIdAtom);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<{ list: ChangeLog[] }>({ list: [] });

  useEffect(() => {
    if (targetUserId && open) {
      getChangeLog({
        targetUserId,
        appType: "AGENT",
        pageNum,
        pageSize,
      }).then(({ data }) => {
        console.info(data);
        if (data) {
          setData(data);
          setTotal(data.total);
          setPageNum(data.pageNum);
          setPageSize(data.pageSize);
        }
      });
    }
  }, [targetUserId, open, pageNum, pageSize]);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("changeLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("operateTime")}</TableHead>
                <TableHead>{t("operater")}</TableHead>
                <TableHead>{t("username")}</TableHead>
                <TableHead>{t("ip")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("operateType")}</TableHead>
                <TableHead>{t("operateDesc")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.operateTime}</TableCell>
                  <TableCell>{item.userNickName}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.remoteIp}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.bizType}</TableCell>
                  <TableCell>{item.msg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
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
          <Button>{translation("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
