import { getPokerReport } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  PokerReportRequestParams,
  PokerReportRequestRecords,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import DetailButton from "./detail-button";

async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.agent");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("gameName")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("roomType")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("issueNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("playerNumber")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("more")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: PokerReportRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: PokerReportRequestRecords) => (
          <TableRow key={`${item.userId}`}>
            <TableCell className="w-24 text-center">{item.userId}</TableCell>
            <TableCell className="w-24 text-center">{item.gameName}</TableCell>
            <TableCell className="w-24 text-center">
              {item.expectedShareAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.interceptAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.throwAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.actualShareWinLoss}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.backIncome}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.backOutcome}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.pureBackAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.totalProfitLossAmount}
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
}: { searchParams: Promise<PokerReportRequestParams> }) {
  const t = await getTranslations("report.agent");
  const params = await searchParams;
  const { data } = await getPokerReport(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
            <ListBody list={data?.list ?? []} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={data?.pageNum ?? 1}
          pageSize={data?.pageSize ?? 10}
        />
      </div>
      <div className="pt-2 w-1/3">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("issueNumber")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("player")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">123</TableCell>
              <TableCell className="w-24 text-center">4456</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
