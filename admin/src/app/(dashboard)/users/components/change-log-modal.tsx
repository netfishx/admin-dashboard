"use client";

import { getChangeLog } from "@/api";
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
import { changeLogDataAtom, changeLogModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { startTransition } from "react";
import { toast } from "sonner";

export function ChangeLogModal({
  targetUserId,
  appType,
}: {
  targetUserId: string;
  appType: "AGENT" | "MEMBER";
}) {
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [open, setOpen] = useAtom(changeLogModalAtom);
  const [data, setData] = useAtom(changeLogDataAtom);

  function handleChange({
    pageNum,
    pageSize,
  }: {
    pageNum: number;
    pageSize: number;
  }) {
    startTransition(async () => {
      if (targetUserId) {
        const { code, data, message } = await getChangeLog({
          targetUserId,
          appType,
          pageNum,
          pageSize,
        });
        if (code === 0 && data) {
          setData(data);
        } else {
          toast.error(message);
        }
      }
    });
  }

  const handleClose = () => {
    setOpen(false);
    setData(undefined);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("changeLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
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
            <TableBody>
              {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
              {data?.list?.length ? (
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
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    {translation("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ScrollableTable>
        </div>
        {!!data?.total && (
          <ModalPagination total={data.total} onChange={handleChange} />
        )}
      </DialogContent>
    </Dialog>
  );
}
