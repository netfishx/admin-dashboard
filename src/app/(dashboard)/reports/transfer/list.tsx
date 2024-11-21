import { postGetTransferLogList } from "@/api";
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
  TransferRecordRequestParams,
  TransferRecordRequestRecords,
} from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.borrow");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("orderNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("senderAgentId")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("recipientAgentId")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("amount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("type")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: TransferRecordRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.transactionID}>
            <TableCell className="w-24 text-center">
              {item.transactionID}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.senderAgentId}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.recipientAgentId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.amount}</TableCell>
            <TableCell className="w-24 text-center">
              {item.operateCode}
            </TableCell>
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
}: { searchParams: Promise<TransferRecordRequestParams> }) {
  const t = await getTranslations("report.borrow");
  const params = await searchParams;
  const { data } = await postGetTransferLogList(params);
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
