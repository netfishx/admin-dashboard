"use client";

import { type GameConfig, getAgentConfig, updateAgentGameConfig } from "@/api";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { agentIdAtom, rebateModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function RebateModal() {
  const translations = useTranslations();
  const t = useTranslations("users.agents");

  const [open, setOpen] = useAtom(rebateModalAtom);
  const userId = useAtomValue(agentIdAtom);

  const [data, setData] = useState<{ list: GameConfig[] | undefined }>();
  useEffect(() => {
    if (userId && open) {
      getAgentConfig({ userId }).then(({ data }) => {
        console.info(data);
        setData(data);
      });
    }
  }, [userId, open]);

  const handleChange = (gameId: number, value: string) => {
    if (data?.list) {
      const list = data.list.map((item) => {
        if (item.gameId === gameId) {
          return {
            ...item,
            backRate:
              Number(value) > item.maxBackRate
                ? item.maxBackRate
                : Number(value),
          };
        }
        return item;
      });
      setData({ ...data, list });
    }
  };

  const handleConfirm = () => {
    if (data?.list) {
      updateAgentGameConfig({
        userId,
        list: data.list,
      }).then(({ data, message, code }) => {
        console.info(data, message, code);
        setOpen(false);
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("rebateSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("name")}</TableHead>
                <TableHead className="min-w-32 w-1/2">{t("rebate")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list
                ?.filter((item) => item.gameType === 61)
                .map((item) => (
                  <TableRow key={item.gameId}>
                    <TableCell>{item.gameId}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Input
                        value={item.backRate}
                        type="number"
                        onChange={(e) => {
                          handleChange(item.gameId, e.target.value);
                        }}
                      />
                      <span className="text-destructive">{`${item.maxBackRate}%`}</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={handleConfirm}>{translations("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
