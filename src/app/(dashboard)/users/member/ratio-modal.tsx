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
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function RatioModal() {
  const translations = useTranslations();
  const t = useTranslations("users.members");
  const userId = useAtomValue(memberIdAtom);
  const [open, setOpen] = useAtom(ratioModalAtom);
  const [data, setData] = useState<GameConfig[] | undefined>();
  useEffect(() => {
    if (userId && open) {
      getGameConfig(userId).then(({ data }) => {
        console.info("game config", data);
        setData(data);
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
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data
                  ?.filter((item) => item.gameType === 61)
                  .map((item) => (
                    <TableRow key={item.gameId}>
                      <TableCell>{item.gameName}</TableCell>
                      <TableCell>{item.percent}%</TableCell>
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
          <Button onClick={() => setOpen(false)}>
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
