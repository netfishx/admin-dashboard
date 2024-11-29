import { postGetBorrowLogList } from "@/api";
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
  BorrowRecordRequestParams,
  BorrowRecordRequestRecords,
} from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.borrow");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("orderNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("memberID")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("amount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("type")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: BorrowRecordRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-24 text-center">{item.orderNo}</TableCell>
            <TableCell className="w-24 text-center">{item.agentId}</TableCell>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.operateMoney}
            </TableCell>
            <TableCell className="w-24 text-center">{item.orderType}</TableCell>
            <TableCell className="w-24 text-center">
              {format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center h-40">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: { searchParams: Promise<BorrowRecordRequestParams> }) {
  const t = await getTranslations("report.borrow");
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params?.pageNum) || 1,
    pageSize: Number(params?.pageSize) || 10,
    startTime: Number(params?.startTime) || 0,
    endTime: Number(params?.endTime) || 0,
  };
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm relative">
          <Table>
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await postGetBorrowLogList(p);

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
    </div>
  );
}
