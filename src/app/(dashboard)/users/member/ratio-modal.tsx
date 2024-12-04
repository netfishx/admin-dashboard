"use client";

import { getGameConfig } from "@/api";
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
import type { GameConfig } from "@/lib/types";
import { memberIdAtom, ratioModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function RatioModal() {
  const translations = useTranslations();
  const t = useTranslations("users.members");
  const userId = useAtomValue(memberIdAtom);
  const [open, setOpen] = useAtom(ratioModalAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<GameConfig[] | undefined>();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("ratioInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-md font-medium">{t("baccarat")}</span>
          <div className="border rounded-sm">
            <Table>
              <TableHeader className="table w-full">
                <TableRow className="bg-muted">
                  <TableHead className="w-[200px]">{t("name")}</TableHead>
                  <TableHead className="w-[200px]">{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <RatioSkeleton />
              ) : (
                <TableBody className="max-h-[370px] overflow-auto w-full block">
                  {data &&
                  data?.filter((item) => item.gameType === 61).length > 0 ? (
                    data
                      ?.filter((item) => item.gameType === 61)
                      .map((item) => (
                        <TableRow key={item.gameId}>
                          <TableCell className="w-[200px]">
                            {item.gameName}
                          </TableCell>
                          <TableCell className="w-[200px]">
                            {item.percent}%
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center h-40">
                        {translations("noData")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </div>
        </div>
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

function RatioSkeleton() {
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
