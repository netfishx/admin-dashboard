"use client";

import { getAgentLoginLog } from "@/api";
import { Button } from "@/components/ui/button";
import type { Subaccount } from "@/lib/types";
import {
  loginLogDataAtom,
  loginLogModalAtom,
  subaccountAtom,
  subaccountDeleteAtom,
  subaccountDeleteDialogAtom,
  subaccountDialogAtom,
  subaccountIdAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

export function AddButton() {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(subaccountDialogAtom);
  const setData = useSetAtom(subaccountAtom);
  return (
    <Button
      onClick={() => {
        setData(null);
        setOpen(true);
      }}
    >
      {t("add")}
    </Button>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const t = useTranslations("system.subaccount");
  const setData = useSetAtom(subaccountDeleteAtom);
  const setOpen = useSetAtom(subaccountDeleteDialogAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm text-destructive hover:text-destructive/80"
      onClick={() => {
        setData(id);
        setOpen(true);
      }}
    >
      {t("delete")}
    </Button>
  );
}
export function EditButton({ data }: { data: Subaccount }) {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(subaccountDialogAtom);
  const setData = useSetAtom(subaccountAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm text-primary hover:text-primary/80"
      onClick={() => {
        setData(data);
        setOpen(true);
      }}
    >
      {t("info")}
    </Button>
  );
}

export function LoginLogButton({ id }: { id: string }) {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(loginLogModalAtom);
  const setId = useSetAtom(subaccountIdAtom);
  const setData = useSetAtom(loginLogDataAtom);
  const [isPending, startGetLoginLog] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      className="text-sm text-primary hover:text-primary/80"
      onClick={() => {
        startGetLoginLog(async () => {
          setId(id);
          const {
            code,
            data: logs,
            message,
          } = await getAgentLoginLog({
            userId: id,
            pageNum: 1,
            pageSize: 10,
          });
          if (code === 0) {
            setData(logs);
            setOpen(true);
          } else {
            toast.error(message);
          }
        });
      }}
    >
      {isPending && <Loader2 className="animate-spin" />}
      {t("loginLog")}
    </Button>
  );
}
