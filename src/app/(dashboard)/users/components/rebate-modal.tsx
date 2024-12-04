"use client";

import { getGameConfig, updateAgentGameConfig } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { rebateModalAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
export function RebateModal({ userId }: { userId: string }) {
  const translations = useTranslations();
  const t = useTranslations("users.agents");

  const [open, setOpen] = useAtom(rebateModalAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<GameConfig[] | undefined>();
  const router = useRouter();
  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getGameConfig(userId).then(({ code, data, message }) => {
        setLoading(false);
        if (code === 0 && data) {
          setData(data);
        } else {
          toast.error(message);
        }
      });
    }
  }, [userId, open]);

  const handleChange = (gameId: number, value: string) => {
    if (data) {
      const list = data.map((item) => {
        if (item.gameId === gameId) {
          return {
            ...item,
            backRate:
              Number(value) > (Number(item.maxBackRate) ?? 0)
                ? item.maxBackRate
                : value,
          };
        }
        return item;
      });
      setData(list);
    }
  };

  const handleConfirm = () => {
    if (data) {
      updateAgentGameConfig({
        userId,
        list: data,
      }).then(({ code, message }) => {
        if (code === 0) {
          toast.success(message);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("rebateSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-44">{t("name")}</TableHead>
                <TableHead className="flex-1">{t("rebate")}</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <RebateSkeleton />
            ) : (
              <TableBodyWrapper
                data={data ?? []}
                handleChange={(gameId, value) => handleChange(gameId, value)}
              />
            )}
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RebateSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={2}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function TableBodyWrapper({
  data,
  handleChange,
}: {
  data: GameConfig[] | [];
  handleChange: (gameId: number, value: string) => void;
}) {
  const translations = useTranslations();
  return (
    <TableBody className="w-full max-h-[50dvh] overflow-auto block">
      {data?.length > 0 ? (
        data
          ?.filter((item) => item.gameType === 61)
          .map((item) => (
            <TableRow key={item.gameId}>
              <TableCell className="w-44">{item.gameName}</TableCell>
              <TableCell className="flex-1 flex items-center gap-2">
                <Input
                  className="w-32"
                  value={item.backRate}
                  type="number"
                  step={0.01}
                  min={0}
                  max={item.maxBackRate ?? 0}
                  onChange={(e) => {
                    handleChange(item.gameId, e.target.value);
                  }}
                />
                <span className="text-destructive">{`${item.maxBackRate}%`}</span>
              </TableCell>
            </TableRow>
          ))
      ) : (
        <TableRow className="flex justify-center items-center">
          <TableCell
            colSpan={2}
            className="flex justify-center items-center h-20"
          >
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
