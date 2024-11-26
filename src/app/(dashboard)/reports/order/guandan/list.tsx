import { getGuandanReportList } from "@/api";
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
  GameRecordRequestParams,
  GameRecordRequestRecords,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import DetailButton from "./detail-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.orderlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("issuenumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("roomeownerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("ministerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        <TableHead className="min-w-24 text-center">底注</TableHead>
        <TableHead className="min-w-24 text-center">封顶</TableHead>
        <TableHead className="min-w-24 text-center">级数</TableHead>
        <TableHead className="min-w-24 text-center">结算金额</TableHead>
        <TableHead className="min-w-24 text-center">炸数</TableHead>
        <TableHead className="min-w-24 text-center">倍数</TableHead>
        <TableHead className="min-w-24 text-center">输赢玩家</TableHead>
        <TableHead className="min-w-24 text-center">游戏开始时间</TableHead>
        <TableHead className="min-w-24 text-center">结算完成时间</TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: GameRecordRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: GameRecordRequestRecords) => (
          <TableRow key={item.id}>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
            <TableCell className="w-24 text-center">123</TableCell>
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
}: { searchParams: Promise<GameRecordRequestParams> }) {
  const params = await searchParams;
  const { data } = await getGuandanReportList(params);
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
