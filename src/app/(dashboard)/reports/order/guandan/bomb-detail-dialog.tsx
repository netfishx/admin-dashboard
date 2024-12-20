"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  guandanBombDetailAtom,
  orderListGuandanBombDetailDialogAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export function BombDetailDialog() {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanBombDetailDialogAtom);
  const [isPending, startTransition] = useTransition();
  const orderListBombDetailRecord = useAtomValue(guandanBombDetailAtom);

  function processAndSortCards(hand: string[]): string {
    // 定义花色和点数的映射规则
    const SUIT_MAPPING: { [key: string]: string } = {
      S: "黑桃",
      H: "红桃",
      C: "梅花",
      D: "方片",
      X: "小王",
      Y: "大王",
    };

    const RANK_MAPPING: { [key: string]: string } = {
      "1": "A",
      "11": "J",
      "12": "Q",
      "13": "K",
      "14": "",
    };

    // 对手牌排序：优先按花色 (黑红梅方)，其次按点数从小到大
    hand.sort((a, b) => {
      const suitOrder = ["S", "H", "C", "D", "X", "Y"];
      const aSuit = a[0];
      const bSuit = b[0];
      const aRank = Number.parseInt(a.slice(1));
      const bRank = Number.parseInt(b.slice(1));
      if (suitOrder.indexOf(aSuit) !== suitOrder.indexOf(bSuit)) {
        return suitOrder.indexOf(aSuit) - suitOrder.indexOf(bSuit);
      }
      return aRank - bRank;
    });

    // 统计牌的数量
    const cardCount: { [key: string]: number } = {};
    hand.forEach((card) => {
      const suit = card[0];
      const rank = card.slice(1);
      const suitName = SUIT_MAPPING[suit];
      const rankName = RANK_MAPPING[rank] || rank; // 转换点数

      const cardKey = `${suitName}${rankName}`;
      cardCount[cardKey] = (cardCount[cardKey] || 0) + 1;
    });

    // 格式化输出字符串
    const result = Object.entries(cardCount)
      .map(([card, count]) => `${card}*${count}`)
      .join("，");

    return result;
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="max-w-5xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("bombDetail")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="rounded-sm border">
          <Table>
            <TableHeader className="table w-full">
              <TableRow className="bg-muted">
                <TableHead className="w-[150px]">{t("memberId")}</TableHead>
                <TableHead className="w-[150px]">{t("bombNumber")}</TableHead>
                <TableHead className="w-[150px]">{t("score")}</TableHead>
                <TableHead className="w-[150px]">{t("rank")}</TableHead>
                <TableHead className="w-[150px]">{t("tribute")}</TableHead>
                <TableHead className="w-[200px]">{t("hand")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="table w-full">
              {orderListBombDetailRecord.length > 0 ? (
                orderListBombDetailRecord.map((item) => (
                  <TableRow key={item.memberId}>
                    <TableCell className="w-[150px]">{item.memberId}</TableCell>
                    <TableCell className="w-[150px]">{item.bombs}</TableCell>
                    <TableCell className="w-[150px]">{item.score}</TableCell>
                    <TableCell className="w-[150px]">{item.rank}</TableCell>
                    <TableCell className="w-[150px]">{item.tribute}</TableCell>
                    <TableCell className="no-wrap w-[200px] max-w-[200px]">
                      <ScrollArea className="max-h-20">
                        {processAndSortCards(item.hand)}
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="flex w-full items-center justify-center">
                  <TableCell className="flex h-40 items-center justify-center text-center">
                    {translation("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => setOpen(false))}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
