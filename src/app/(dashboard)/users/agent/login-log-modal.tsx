"use client";
import { getLoginLog } from "@/api";
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
import {} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { loginLogModalAtom, loginLogUserIdAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface LoginLog {
  userId: string;
  loginTime: string;
  ip: string;
  address: string;
  status: number;
}

export function LoginLogModal() {
  const t = useTranslations("users.agents");
  const [data, setData] = useState<LoginLog[]>([]);
  const userId = useAtomValue(loginLogUserIdAtom);
  const [open, setOpen] = useAtom(loginLogModalAtom);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  useEffect(() => {
    if (userId) {
      getLoginLog({ userId, page, size }).then(
        (res: {
          data: LoginLog[];
          total: number;
          page: number;
          size: number;
        }) => {
          setData(res.data);
          setTotal(res.total);
          setPage(res.page);
          setSize(res.size);
        },
      );
    }
  }, [userId, page, size]);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="2xl:max-w-2xl lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("loginLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <ScrollArea className="h-[40vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("loginTime")}</TableHead>
                  <TableHead>{t("ip")}</TableHead>
                  <TableHead>{t("address")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item: LoginLog) => (
                  <TableRow key={item.userId + Math.random()}>
                    <TableCell>{item.loginTime}</TableCell>
                    <TableCell>{item.ip}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>
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
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
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
            {t("close")}
          </Button>
          <Button>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
