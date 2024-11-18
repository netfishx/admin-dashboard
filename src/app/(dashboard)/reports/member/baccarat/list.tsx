import { getMemberReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import ListScrollArea from "@/components/list-scroll-area";
import TableSkeleton from "@/components/table-skeleton";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MemberReportsRecord } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import DetailButton from "./detail-button";

async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.member");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">{t("member_id")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("member_type")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("game_name")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("bet_count")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("bet_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("valid_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("win_loss_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("cashback_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("profit_loss_result")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("details")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: MemberReportsRecord[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: MemberReportsRecord) => (
          <TableRow key={item.memberId}>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.memberTypeName}
            </TableCell>
            <TableCell className="w-24 text-center">{item.gameId}</TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
            <TableCell className="w-24 text-center">
              {item.memberBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.availableBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.winLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.pureBackAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.profitLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              <DetailButton item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="text-center h-40">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: { searchParams: Promise<MemberReportsRecord> }) {
  const t = await getTranslations("report.member");
  const params = await searchParams;
  const { data } = await getMemberReportList(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <ListHeader />
            <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
              <ListBody list={data?.list ?? []} />
            </Suspense>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
      <div className="pt-2 w-2/5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("bet_count")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("bet_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("valid_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("win_loss_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("cashback_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("profit_loss_result")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalBetNum}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalMemberBetAmount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalAvailableBetAmount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalWinLossAmount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalPureBackAmount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].totalProfitLossAmount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
