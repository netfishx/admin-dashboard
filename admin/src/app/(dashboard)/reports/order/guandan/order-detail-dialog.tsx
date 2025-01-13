"use client";

import { getGuandanReportListDetail } from "@/api";
import { Time } from "@/components/time";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  guandanOrderIdAtom,
  orderListGuandanDetailDataAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function OrderDetailDialog() {
  const translation = useTranslations();
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const id = useAtomValue(guandanOrderIdAtom);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useAtom(orderListGuandanDetailDataAtom);


  useEffect(() => {
    if (id) {
      handleChange({ pageNum: 1, pageSize: 10 });
    }
  }, [id]);


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

  function handleChange({
    pageNum,
    pageSize,
  }: {
    pageNum: number;
    pageSize: number;
  }) {
    startTransition(async () => {
      const { code, data, message } = await getGuandanReportListDetail({
        issueNumber: id,
        pageNum,
        pageSize,
      });
      if (code === 0 && data) {
        setData(data);
      } else {
        toast.error(message);
      }
    });
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
        <div className="rounded-sm border max-h-[50dvh] overflow-auto">
          <ScrollableTable className="table-fixed relative">
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
                <TableHead className="w-12">{t("tribute")}</TableHead>
                <TableHead className="w-60">{t("hand")}</TableHead>
              </TableRow>
            </TableHeader>
            {isPending ? (
              <ChangeLogSkeleton />
            ) : (
              <TableBody>
                {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
                {data?.list?.length ? (
                  data?.list?.map((item, index) => (
                    item.details.map((detail) => (
                      <TableRow key={Math.random()}>
                        <TableCell>{index}</TableCell>
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
                    ))
                  ))
                ) : (
                  <TableRow className="flex w-full items-center justify-center">
                    <TableCell className="h-48 text-center">
                      {translation("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </ScrollableTable>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChangeLogSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={i}>
          <TableCell colSpan={10}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
