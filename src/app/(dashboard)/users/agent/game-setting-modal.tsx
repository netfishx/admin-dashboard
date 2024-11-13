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
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function GameSettingModal() {
  const translations = useTranslations();
  const t = useTranslations("users.agents");
  const userId = useAtomValue(agentIdAtom);
  const [open, setOpen] = useAtom(gameSettingModalAtom);
  const [data, setData] = useState<GameConfig[] | undefined>();
  useEffect(() => {
    if (userId && open) {
      getGameConfig(userId).then(({ data }) => {
        console.info("game config", data);
        setData(data);
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
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("switch")}</TableHead>
                  <TableHead className="min-w-32 w-1/2">{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data
                  ?.filter((item) => item.gameType === 61)
                  .map((item) => (
                    <TableRow key={item.gameId}>
                      <TableCell>{item.gameName}</TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status === 1}
                          onCheckedChange={(checked) => {
                            handleChangeStatus(item.gameId, checked ? 1 : 0);
                          }}
                        />
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
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
                  ))}
              </TableBody>
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
              <TableBody>
                {data
                  ?.filter((item) => item.gameType === 20)
                  .map((item) => (
                    <TableRow key={item.gameId}>
                      <TableCell>{item.gameId}</TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status === 1}
                          onCheckedChange={(checked) => {
                            handleChangeStatus(item.gameId, checked ? 1 : 0);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleClickUpdate}>{translations("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
