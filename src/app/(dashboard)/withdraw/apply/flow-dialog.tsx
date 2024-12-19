"use client";
import { Time } from "@/components/time";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameInfo, OrderReportsRecord } from "@/lib/types";
import {
  orderParmasAtom,
  withdrawFlowDataAtom,
  withdrawFlowDialogAtom,
} from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function FlowDialog({
  gameList,
}: {
  gameList: GameInfo[];
}) {
  const t = useTranslations("withdraw.apply");
  const [open, setOpen] = useAtom(withdrawFlowDialogAtom);
  const [flowData] = useAtom(withdrawFlowDataAtom);
  const [orderParmas] = useAtom(orderParmasAtom);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[80dvw] max-w-[80dvw]">
        <DialogTitle className="flex justify-between">
          <span>{t("flow")}</span>
        </DialogTitle>
        <div className="p-4 bg-background flex-1 overflow-auto">
          {flowData?.list && flowData?.list?.length > 0 && (
            <div className="flex justify-end mb-4">
              <Button
                size="sm"
                onClick={() => {
                  setOpen(false);
                  router.replace(
                    `/reports/order/baccarat?${new URLSearchParams(
                      orderParmas as Record<string, string>,
                    ).toString()}`,
                  );
                }}
              >
                {t("more")}
              </Button>
            </div>
          )}
          <div className="relative max-h-[50dvh] overflow-auto border rounded-sm">
            <ScrollableTable className="relative table-fixed">
              <ListHeader />
              <ListBody list={flowData?.list ?? []} gameList={gameList} />
            </ScrollableTable>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ListHeader() {
  const t = useTranslations("report.orderlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted sticky top-0">
        <TableHead className="w-40">{t("ordernumber")}</TableHead>
        <TableHead className="w-40">{t("issuenumber")}</TableHead>
        <TableHead className="w-60">{t("memberID")}</TableHead>
        <TableHead className="w-40">{t("gamename")}</TableHead>
        <TableHead className="w-40">{t("smallType")}</TableHead>
        <TableHead className="w-40">{t("betamount")}</TableHead>
        <TableHead className="w-40">{t("winamount")}</TableHead>
        <TableHead className="w-[180px]">{t("bettime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

function ListBody({
  list,
  gameList,
}: {
  list: OrderReportsRecord[];
  gameList: GameInfo[];
}) {
  const translate = useTranslations();

  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: OrderReportsRecord) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.issueNumber}</TableCell>
            <TableCell>{item.memberId}</TableCell>
            <TableCell className="whitespace-nowrap">
              {gameList.find((game) => game.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell>{item.betType}</TableCell> {/* todo: 小玩法转换 */}
            <TableCell>{item?.betAmount}</TableCell>
            <TableCell>{item.winLossAmount}</TableCell>
            <TableCell>
              <Time time={item.betTime} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={8} className="h-40 text-center">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
