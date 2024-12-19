import { postGetTransferLogList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Time } from "@/components/time";
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
import { hasPermission } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  const t = await getTranslations("report.transfer");
  const hasTransferTypePermission = await hasPermission("transfer_type");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("orderNumber")}</TableHead>
        <TableHead className="w-60">{t("senderAgentId")}</TableHead>
        <TableHead className="w-60">{t("recipientAgentId")}</TableHead>
        <TableHead className="w-60">{t("amount")}</TableHead>
        {hasTransferTypePermission && (
          <TableHead className="w-40">{t("type")}</TableHead>
        )}
        <TableHead className="w-[240px]">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: TransferRecordRequestRecords[] }) {
  const translate = await getTranslations();
  const t = await getTranslations("report.transfer");
  const hasTransferTypePermission = await hasPermission("transfer_type");
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.transactionID}>
            <TableCell>{item.transactionID}</TableCell>
            <TableCell>{item.senderAgentId}</TableCell>
            <TableCell>{item.recipientAgentId}</TableCell>
            <TableCell>{item.amount}</TableCell>
            {hasTransferTypePermission && (
              <TableCell>
                {item.operateCode === -1 ? t("transferOut") : t("transferIn")}
              </TableCell>
            )}
            <TableCell>
              <Time time={item.createTime} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasTransferTypePermission ? 6 : 5}
            className="h-40 text-center"
          >
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: {
  searchParams: Promise<TransferRecordRequestParams>;
}) {
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params.pageNum) || 1,
    pageSize: Number(params.pageSize) || 10,
    startTime: Number(params.startTime) || 0,
    endTime: Number(params.endTime) || 0,
  };
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="flex-1 bg-background p-4">
        <div className="relative rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await postGetTransferLogList(p);

  return (
    <div className="flex-1 bg-background p-4">
      <div className="relative rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
            <ListBody list={data?.list ?? []} />
          </Suspense>
        </Table>
      </div>
      {data?.total && data?.total > 0 && (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={data?.pageNum ?? 1}
            pageSize={data?.pageSize ?? 10}
          />
        </div>
      )}
    </div>
  );
}
