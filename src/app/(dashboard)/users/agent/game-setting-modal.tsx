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

export function GameSettingModal() {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const userId = useAtomValue(agentIdAtom);
  const [loading, setLoading] = useState(true);
  const [isPeding, startTransition] = useTransition();
  const [open, setOpen] = useAtom(gameSettingModalAtom);
  const [data, setData] = useState<GameConfig[] | undefined>();
  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getGameConfig(userId).then(({ data }) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [userId, open]);
  const handleChangePercent = (gameId: number, percent: number) => {
    if (data) {
      const newList = data.map((item) =>
        item.gameId === gameId
          ? {
              ...item,
              percent:
                Number(percent) > (Number(item.maxPercent) ?? 0)
                  ? item.maxPercent
                  : percent.toString(),
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
    if (data) {
      const req = data.map((item) => ({
        gameId: item.gameId,
        gameType: item.gameType,
        percent: item.percent,
        status: item.status,
      }));
      updateAgentGameConfig({ userId, list: req }).then(
        ({ data, code, message }) => {
          console.info(data, code, message);
          setOpen(false);
        },
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("gamesSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-md font-medium">{t("baccarat")}</span>
          <div className="border rounded-sm">
            <Table>
              <TableHeader className="table w-full">
                <TableRow className="bg-muted">
                  <TableHead className="w-[100px]">{t("name")}</TableHead>
                  <TableHead className="w-[100px]">{t("switch")}</TableHead>
                  <TableHead className="w-[200px]">{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <GameSettingSkeleton length={5} colSpan={3} />
              ) : (
                <TableBody className="max-h-[370px] overflow-auto w-full block">
                  {data &&
                  data?.filter((item) => item.gameType === 61).length > 0 ? (
                    data
                      ?.filter((item) => item.gameType === 61)
                      .map((item) => (
                        <TableRow key={item.gameId}>
                          <TableCell className="w-[100px]">
                            {item.gameName}
                          </TableCell>
                          <TableCell className="w-[100px]">
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
                          <TableCell className="flex items-center gap-2 w-[200px]">
                            <Input
                              value={item.percent}
                              type="number"
                              max={item.maxPercent}
                              onChange={(e) => {
                                handleChangePercent(
                                  item.gameId,
                                  Number(e.target.value),
                                );
                              }}
                            />
                            <span className="text-destructive">
                              {`(${item.maxPercent}%)`}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow className="flex justify-center items-center">
                      <TableCell
                        colSpan={3}
                        className="flex justify-center items-center h-20"
                      >
                        {translations("noData")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-medium">{t("guandan")}</span>
          <div className="border rounded-sm">
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
                          <TableCell>{item.gameId}</TableCell>
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
                      <TableCell colSpan={2} className="text-center h-6">
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
            disabled={isPeding}
            onClick={() => startTransition(handleClickUpdate)}
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
}: { length: number; colSpan: number }) {
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
