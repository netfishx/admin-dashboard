import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderReportsRecord, PageData, Res } from "@/lib/types";
import { useTranslations } from "next-intl";
import DetailButton from "./detail-button";

export function List({ data }: { data: Res<PageData<OrderReportsRecord>> }) {
  const t = useTranslations("report.orderlist");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("ordernumber")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("issuenumber")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("memberID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("roomeownerID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("ministerID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("leastlevelID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("gamename")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("smallType")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("odds")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("result")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("betamount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("winamount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bettime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("drawtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("membersettlementtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("proxysettlementtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("proxystatus")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  {t("action")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.map((item: OrderReportsRecord) => (
                <TableRow key={item.id}>
                  <TableCell className="w-24 text-center">{item.id}</TableCell>
                  <TableCell className="w-24 text-center">
                    {item.issueNumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.roomOwnerId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.minister}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.lastAgentId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.betType}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {
                      Object.entries(item.odds || {})[
                        Object.entries(item.odds || {}).length - 1
                      ]
                    }
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    缺少开奖记录
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item?.betAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.winLossAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.betTime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    缺少开奖时间
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.settleTime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    缺少代理结算时间
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.orderStatus}
                  </TableCell>
                  <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
                    <DetailButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
    </div>
  );
}
