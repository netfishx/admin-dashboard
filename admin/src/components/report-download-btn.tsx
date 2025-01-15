"use client";

import { exportTask } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const exportButtonCodeMap: Record<string, number> = {
  "/reports/supplier": 100000,
  "/reports/period": 100001,
  "/reports/member/baccarat": 100004,
  "/reports/order/guandan": 100006,
  "/reports/agent/baccarat/member": 100002,
  "/reports/agent/baccarat/ratio": 100003,
  "/reports/order/baccarat": 100005,
};

export function ReportDownloadBtn({
  searchParams,
  pathname,
}: {
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
}) {
  const t = useTranslations("report");
  const translations = useTranslations();
  const [isPending, startDownload] = useTransition();
  async function makeDownload() {
    const params = {
      exportButtonCode: exportButtonCodeMap[pathname] ?? 0,
      queryParams: JSON.stringify(Object.fromEntries(searchParams)),
    };
    const { code, message } = await exportTask(params);
    if (code === 0) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {t("downloadbtn")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("downloadTip")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => startDownload(makeDownload)}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
