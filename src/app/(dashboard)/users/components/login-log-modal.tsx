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
import { cn } from "@/lib/utils";
import { loginLogModalAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

export function LoginLogModal({
  id,
  type,
}: { id: string; type: "AGENT" | "MEMBER" }) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const [data, setData] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useAtom(loginLogModalAtom);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  useEffect(() => {
    if (id && type === "AGENT") {
      console.info(id, type);
      setLoading(true);
      getAgentLoginLog({ agentId: id, pageNum: page, pageSize: size }).then(
        ({ data }) => {
          if (data) {
            setData(data.list);
            setTotal(data.total);
            setPage(data.pageNum);
            setSize(data.pageSize);
            setLoading(false);
          }
        },
      );
    } else if (id && type === "MEMBER") {
      console.info(id, type);
      setLoading(true);
      getMemberLoginLog({ memberId: id, pageNum: page, pageSize: size }).then(
        ({ data }) => {
          if (data) {
            setData(data.list);
            setTotal(data.total);
            setPage(data.pageNum);
            setSize(data.pageSize);
            setLoading(false);
          }
        },
      );
    }
  }, [id, page, size, type]);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
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
              <TableBody className="w-full max-h-[370px] overflow-auto block">
                {data?.length > 0 ? (
                  data?.map((item: LoginLog) => (
                    <TableRow key={item.userId + Math.random()}>
                      <TableCell className="w-[150px] 2xl:w-[200px]">
                        {item.loginTime}
                      </TableCell>
                      <TableCell className="w-[150px] 2xl:w-[200px]">
                        {item.ip}
                      </TableCell>
                      <TableCell className="w-[120px] 2xl:w-[150px]">
                        {item.address}
                      </TableCell>
                      <TableCell className="w-[100px] 2xl:w-[120px]">
                        <div
                          className={cn(
                            "px-2 rounded-sm w-fit",
                            item.status === 1 && "text-primary bg-primary/10",
                            item.status === 2 &&
                              "text-destructive bg-destructive/10",
                          )}
                        >
                          {t(`statusLabel.${item.status}`)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-40">
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => setOpen(false))}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
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
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
