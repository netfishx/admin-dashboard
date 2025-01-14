"use client";
import { Poker } from "@/components/poker";
import { Time } from "@/components/time";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  guandanOrderDetailAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export function OrderDetailDialog() {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const list = useAtomValue(guandanOrderDetailAtom);

  function processAndSortCards(hand: string[]) {
    // 计算每张牌的出现次数
    const cardCounts = hand.reduce(
      (acc, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // 按花色分组并排序
    const groupedCards = hand.reduce(
      (acc, card) => {
        const suit = card[0];
        if (!acc[suit]) {
          acc[suit] = new Set();
        }
        acc[suit].add(card);
        return acc;
      },
      {} as Record<string, Set<string>>,
    );

    // 对每个花色组内的牌按数字大小排序，并添加重复计数
    const sortedAndCounted = ["C", "D", "H", "S", "X", "Y"].flatMap((suit) => {
      const cards = Array.from(groupedCards[suit] || []);
      return cards
        .sort(
          (a, b) => Number.parseInt(a.slice(1)) - Number.parseInt(b.slice(1)),
        )
        .map((card) => ({
          card,
          count: cardCounts[card],
        }));
    });

    return sortedAndCounted.map(({ card, count }, index) => (
      <span key={index + card}>
        <Poker poker={card} suffix={count > 1 ? `*${count}` : "*1"} />
        {index < sortedAndCounted.length - 1 ? ", " : ""}
      </span>
    ));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{t("orderListDetail")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[50dvh] overflow-auto rounded-sm border">
          <ScrollableTable className="relative table-fixed">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0">
                <TableHead className="w-20">{t("serialNumber")}</TableHead>
                <TableHead className="w-20">{t("bombNumber")}</TableHead>
                <TableHead className="w-48">{t("startTime")}</TableHead>
                <TableHead className="w-48">{t("updatedAt")}</TableHead>
                <TableHead className="w-60">{t("memberId")}</TableHead>
                <TableHead className="w-12">{t("bombs")}</TableHead>
                <TableHead className="w-12">{t("score")}</TableHead>
                <TableHead className="w-12">{t("rank")}</TableHead>
                <TableHead className="w-24">{t("tribute")}</TableHead>
                <TableHead className="w-60">{t("hand")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list && list.length > 0 ? (
                list.map((item) =>
                  item.details.map((detail) => (
                    <TableRow key={item.roundNumber + detail.memberId}>
                      <TableCell>{item.roundNumber}</TableCell>
                      <TableCell>{item.bombCount}</TableCell>
                      <TableCell>
                        <Time time={item.createdAt} />
                      </TableCell>
                      <TableCell>
                        <Time time={item.updatedAt} />
                      </TableCell>
                      <TableCell>{detail.memberId}</TableCell>
                      <TableCell>{detail.bombs}</TableCell>
                      <TableCell>{detail.score}</TableCell>
                      <TableCell>{detail.rank}</TableCell>
                      <TableCell>{detail.tribute}</TableCell>
                      <TableCell>{processAndSortCards(detail.hand)}</TableCell>
                    </TableRow>
                  )),
                )
              ) : (
                <TableRow>
                  <TableCell className="h-48 text-center" colSpan={10}>
                    {translation("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ScrollableTable>
        </div>
      </DialogContent>
    </Dialog>
  );
}
