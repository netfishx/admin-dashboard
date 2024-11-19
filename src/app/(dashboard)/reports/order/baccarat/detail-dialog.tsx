"use client";
import { getOrderDetail } from "@/api";
import {
  Dialog,
  DialogContent,
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
import type { OrderItemDetailType } from "@/lib/types";
import { useEffect, useState } from "react";

interface Dialogprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Detaildialog(props: Dialogprops) {
  const { open, onOpenChange } = props;
  const [data, setData] = useState<OrderItemDetailType>();
  useEffect(() => {
    if (open) {
      getOrderDetail({ id: "1731907697706" }).then((res) => {
        setData(res?.data);
        console.log(res?.data, "123");
      });
    }
  }, [open]);

  function formatResult(result: string): string {
    // 定义花色映射
    const suitMap: Record<string, string> = {
      H: "♥", // 红心
      D: "♦", // 方块
      C: "♣", // 梅花
      S: "♠", // 黑桃
    };

    // 拆分闲和庄的数据
    const [player, banker] = result.split(",");

    // 替换花色并格式化每组牌
    const formatCards = (cards: string): string =>
      cards
        .split("-")
        .filter((card) => card !== "XX")
        .map((card) => suitMap[card[0]] + card.slice(1))
        .join(" ");

    const formattedPlayer = `闲 ${formatCards(player)}`;
    const formattedBanker = `庄 ${formatCards(banker)}`;

    // 如果闲或庄没有结果，则不显示
    const outputParts: string[] = [];
    if (formattedBanker !== "庄 ") {
      outputParts.push(formattedBanker);
    }
    if (formattedPlayer !== "闲 ") {
      outputParts.push(formattedPlayer);
    }

    return outputParts.join(" ; ");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>详情</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">占成明细</div>
        <ScrollArea className="w-[450px]">
          <div className="whitespace-nowrap mb-1">
            {data?.revenueShare.map(
              (item) => `${item.accountId} - ${item.percent * 100}%；`,
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* <div>靴数: 8</div>
        <div>牌局结果: 庄:♣3 ♣7; ♦2 ♠6</div> */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-20 text-center">靴数</TableHead>
              <TableHead className="w-20 text-center">局数</TableHead>
              <TableHead className="w-40 text-center">牌局结果</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-20 text-center">{data?.shoeId}</TableCell>
              <TableCell className="w-20 text-center">{data?.playId}</TableCell>
              <TableCell className="w-40 text-center">
                {formatResult(data?.result || "")}
                {/* {data?.result?.split(",")} */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
