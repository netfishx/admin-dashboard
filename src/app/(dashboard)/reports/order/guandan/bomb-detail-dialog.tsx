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
  orderListBombDetailRecordAtom,
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
  const orderListBombDetailRecord =
    useAtomValue(orderListBombDetailRecordAtom) || [];

  function processCards(hand: string[]): string {
    // 定义花色映射
    const SUIT_MAPPING: { [key: string]: string } = {
      H: t("redHeart"),
      D: t("square"),
      S: t("spade"),
      C: t("plum"),
      X: t("smallKing"),
      Y: t("bigKing"),
    };

    // 定义点数映射
    const RANK_MAPPING: { [key: string]: string } = {
      "1": "A",
      "11": "J",
      "12": "Q",
      "13": "K",
      "14": "",
    };

    // 统计卡牌数量
    const cardCount: { [key: string]: number } = {};

    hand.forEach((card) => {
      const suit = card[0]; // 花色
      const rank = card.slice(1); // 点数
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
        <div className="border rounded-sm">
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
              {orderListBombDetailRecord?.length > 0 ? (
                orderListBombDetailRecord?.map((item) => (
                  <TableRow key={item.memberId}>
                    <TableCell className="w-[150px]">{item.memberId}</TableCell>
                    <TableCell className="w-[150px]">{item.bombs}</TableCell>
                    <TableCell className="w-[150px]">{item.score}</TableCell>
                    <TableCell className="w-[150px]">{item.rank}</TableCell>
                    <TableCell className="w-[150px]">{item.tribute}</TableCell>
                    <TableCell className="w-[200px] max-w-[200px] no-wrap">
                      <ScrollArea className="h-20">
                        {processCards(item.hand)}
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="w-full justify-center flex items-center">
                  <TableCell className="text-center h-40 flex items-center justify-center">
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
