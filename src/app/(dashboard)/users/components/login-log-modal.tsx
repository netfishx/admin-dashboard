"use client";
import { getAgentLoginLog, getMemberLoginLog } from "@/api";
import { ModalPagination } from "@/components/modal-pagination";
import { Time } from "@/components/time";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LoginLog } from "@/lib/types";
import { loginLogDataAtom, loginLogModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

export function LoginLogModal({
  id,
  type,
}: {
  id: string;
  type: "AGENT" | "MEMBER";
}) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const [data, setData] = useAtom(loginLogDataAtom);

  const [open, setOpen] = useAtom(loginLogModalAtom);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  useEffect(() => {
    startTransition(async () => {
      if (id && type === "AGENT") {
        const { code, data, message } = await getAgentLoginLog({
          userId: id,
          pageNum: page,
          pageSize: size,
        });

        if (code === 0 && data) {
          setData(data);
        } else {
          toast.error(message);
        }
      } else if (id && type === "MEMBER") {
        const { code, data, message } = await getMemberLoginLog({
          memberId: id,
          pageNum: page,
          pageSize: size,
        });

        if (code === 0 && data) {
          setData(data);
        } else {
          toast.error(message);
        }
      }
    });
  }, [id, type, page, size, setData]);

  const handleClose = () => {
    console.info("close");
    setOpen(false);
    setData(undefined);
    setPage(1);
    setSize(10);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="lg:max-w-xl 2xl:max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("loginLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
          <ScrollableTable className="relative">
            <TableHeader>
              <TableRow className="sticky top-0 bg-muted">
                <TableHead>{t("loginTime")}</TableHead>
                <TableHead>{t("ip")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
              {data?.list?.length ? (
                data?.list?.map((item: LoginLog) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Time time={item.createTime} />
                    </TableCell>
                    <TableCell>{item.ip}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell>
                      <StatusLabel status={Number(item.isSuccess)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center">
                    {translations("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ScrollableTable>
        </div>
        {!!data?.total && (
          <ModalPagination
            total={data.total}
            currentPage={page}
            size={size}
            setPage={setPage}
            setSize={setSize}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function StatusLabel({ status }: { status: number }) {
  const t = useTranslations("users.agents");
  if (status === 0) {
    return (
      <div className="w-fit rounded-sm bg-primary/10 px-2 text-primary">
        {t("success")}
      </div>
    );
  }
  return (
    <div className="w-fit rounded-sm bg-destructive/10 px-2 text-destructive">
      {t("failed")}
    </div>
  );
}
