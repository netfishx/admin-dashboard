"use client";
import { getAgentLoginLog, getMemberLoginLog } from "@/api";
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
import type { LoginLog } from "@/lib/types";
import { loginLogModalAtom } from "@/store";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";

export function LoginLogModal({
  id,
  type,
}: { id: string; type: "AGENT" | "MEMBER" }) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const [data, setData] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useAtom(loginLogModalAtom);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  useEffect(() => {
    if (!open) {
      return;
    }
    startTransition(async () => {
      setLoading(true);
      if (id && type === "AGENT") {
        const { data } = await getAgentLoginLog({
          userId: id,
          pageNum: page,
          pageSize: size,
        });
        if (data) {
          setData(data.list);
          setTotal(data.total);
          setPage(data.pageNum);
          setSize(data.pageSize);
        }
      } else if (id && type === "MEMBER") {
        const { data } = await getMemberLoginLog({
          memberId: id,
          pageNum: page,
          pageSize: size,
        });
        if (data) {
          setData(data.list);
          setTotal(data.total);
          setPage(data.pageNum);
          setSize(data.pageSize);
        }
      }
      setLoading(false);
    });
  }, [id, page, size, type, open]);

  const handleClose = () => {
    setOpen(false);
    setData([]);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="2xl:max-w-2xl lg:max-w-xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("loginLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-[150px] 2xl:w-[200px]">
                  {t("loginTime")}
                </TableHead>
                <TableHead className="w-[150px] 2xl:w-[200px]">
                  {t("ip")}
                </TableHead>
                <TableHead className="w-[120px] 2xl:w-[150px]">
                  {t("address")}
                </TableHead>
                <TableHead className="w-[100px] 2xl:w-[120px]">
                  {t("status")}
                </TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <LoginLogSkeleton />
            ) : (
              <TableBody className="w-full max-h-[50dvh] overflow-auto flex flex-col">
                {data?.length > 0 ? (
                  data?.map((item: LoginLog) => (
                    <TableRow key={item.id + Math.random()}>
                      <TableCell className="w-[150px] 2xl:w-[200px]">
                        {format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
                      </TableCell>
                      <TableCell className="w-[150px] 2xl:w-[200px]">
                        {item.ip}
                      </TableCell>
                      <TableCell className="w-[120px] 2xl:w-[150px]">
                        {item.region}
                      </TableCell>
                      <TableCell className="w-[100px] 2xl:w-[120px]">
                        <StatusLabel status={Number(item.isSuccess)} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="flex justify-center items-center">
                    <TableCell
                      colSpan={4}
                      className="flex justify-center items-center h-40"
                    >
                      {translations("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
        <ModalPagination
          total={total}
          currentPage={page}
          size={size}
          setPage={setPage}
          setSize={setSize}
        />
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleClose}>{translations("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LoginLogSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={4}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function StatusLabel({ status }: { status: number }) {
  const t = useTranslations("users.agents");
  if (status === 0) {
    return (
      <div className="text-primary bg-primary/10 px-2 rounded-sm w-fit">
        {t("success")}
      </div>
    );
  }
  return (
    <div className="text-destructive bg-destructive/10 px-2 rounded-sm w-fit">
      {t("failed")}
    </div>
  );
}
