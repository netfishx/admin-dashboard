import { getOrderReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  OrderReportsRecord,
  OrderReportsRequestParams,
} from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import DetailButton from "./detail-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.orderlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("ordernumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("issuenumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("memberID")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("roomeownerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("ministerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("leastlevelID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("gamename")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("smallType")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("odds")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("betamount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("winamount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("bettime")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("membersettlementtime")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("proxystatus")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: OrderReportsRecord[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: OrderReportsRecord) => (
          <TableRow key={item.id}>
            <TableCell className="w-24 text-center">{item.id}</TableCell>
            <TableCell className="w-24 text-center">
              {item.issueNumber}
            </TableCell>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.roomOwnerId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.minister}</TableCell>
            <TableCell className="w-24 text-center">
              {item.lastAgentId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.gameId}</TableCell>
            <TableCell className="w-24 text-center">{item.betType}</TableCell>
            <TableCell className="w-24 text-center">
              {
                Object.entries(item.odds || {})[
                  Object.entries(item.odds || {}).length - 1
                ]
              }
            </TableCell>
            <TableCell className="w-24 text-center">
              {item?.betAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.winLossAmount}
            </TableCell>
            <TableCell className="text-center">
              {format(item.betTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center">
              {format(item.settleTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.orderStatus}
            </TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
              <DetailButton />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={15} className="text-center h-40">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: { searchParams: Promise<OrderReportsRequestParams> }) {
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params?.pageNum) || 1,
    pageSize: Number(params?.pageSize) || 10,
  };
  const { data } = await getOrderReportList(p);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <ListBody list={data?.list ?? []} />
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
    </div>
  );
}
