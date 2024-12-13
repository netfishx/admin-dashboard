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
import { Switch } from "@/components/ui/switch";
import {
  ScrollableTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameConfig } from "@/lib/types";
import { agentIdAtom, gameSettingModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function GameSettingModal() {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const userId = useAtomValue(agentIdAtom);
  const [loading, setLoading] = useState(true);
  const [isPeding, startTransition] = useTransition();
  const [open, setOpen] = useAtom(gameSettingModalAtom);
  const [data, setData] = useState<GameConfig[] | undefined>();
  // 是否验证
  const [isValidate, setIsValidate] = useState(true);
  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getGameConfig(userId).then(({ code, data, message }) => {
        if (code === 0) {
          setData(data);
        } else {
          toast.error(message);
        }
        setLoading(false);
      });
    }
  }, [userId, open]);
  const handleChangePercent = (gameId: number, percent: string) => {
    if (data) {
      const newList = data.map((item) =>
        item.gameId === gameId
          ? {
              ...item,
              percent,
            }
          : item,
      );
      setData(newList);
    }
  };
  const handleChangeStatus = (gameId: number, status: number) => {
    if (data) {
      const newList = data.map((item) =>
        item.gameId === gameId ? { ...item, status } : item,
      );
      setData(newList);
    }
  };
  const handleClickUpdate = () => {
    startTransition(async () => {
      if (data) {
        const req = data.map((item) => ({
          gameId: item.gameId,
          gameType: item.gameType,
          percent: item.percent,
          status: item.status,
        }));
        const { code, message } = await updateAgentGameConfig({
          userId,
          list: req,
        });
        if (code === 0) {
          toast.success(message);
          setOpen(false);
        } else {
          toast.error(message);
        }
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("gamesSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-md font-medium">{t("baccarat")}</span>
          <div className="max-h-[50dvh] overflow-auto rounded-sm border">
            <ScrollableTable className="relative">
              <TableHeader>
                <TableRow className="sticky top-0 bg-muted">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("switch")}</TableHead>
                  <TableHead>{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <GameSettingSkeleton length={5} colSpan={3} />
              ) : (
                <TableBody>
                  {data &&
                  data?.filter((item) => item.gameType === 61).length > 0 ? (
                    data
                      ?.filter((item) => item.gameType === 61)
                      .map((item) => (
                        <TableRow key={item.gameId}>
                          <TableCell>{item.gameName}</TableCell>
                          <TableCell>
                            <Switch
                              checked={item.status === 1}
                              onCheckedChange={(checked) => {
                                handleChangeStatus(
                                  item.gameId,
                                  checked ? 1 : 0,
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className="flex flex-row items-center gap-2">
                            <Input
                              value={item.percent}
                              type="number"
                              min={0}
                              step={0.01}
                              max={item.maxPercent}
                              onChange={(e) => {
                                handleChangePercent(
                                  item.gameId,
                                  e.target.value,
                                );
                              }}
                              onBlur={(e) => {
                                setIsValidate(e.target.reportValidity());
                              }}
                            />
                            <span className="text-destructive">
                              {`(${item.maxPercent}%)`}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow className="flex items-center justify-center">
                      <TableCell
                        colSpan={3}
                        className="flex h-20 items-center justify-center"
                      >
                        {translations("noData")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </ScrollableTable>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-medium">{t("guandan")}</span>
          <div className="rounded-sm border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("switch")}</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <GameSettingSkeleton length={1} colSpan={2} />
              ) : (
                <TableBody>
                  {data &&
                  data?.filter((item) => item.gameType === 20).length > 0 ? (
                    data
                      ?.filter((item) => item.gameType === 20)
                      .map((item) => (
                        <TableRow key={item.gameId}>
                          <TableCell>{item.gameName}</TableCell>
                          <TableCell>
                            <Switch
                              checked={item.status === 1}
                              onCheckedChange={(checked) => {
                                handleChangeStatus(
                                  item.gameId,
                                  checked ? 1 : 0,
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="h-6 text-center">
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
            disabled={isPeding || !isValidate}
            onClick={handleClickUpdate}
          >
            {isPeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GameSettingSkeleton({
  length,
  colSpan,
}: {
  length: number;
  colSpan: number;
}) {
  return (
    <TableBody>
      {Array.from({ length }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={colSpan}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
