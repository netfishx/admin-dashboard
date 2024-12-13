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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.transfer");
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
  const t = await getTranslations("report.transfer");
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
              {item.operateCode === -1 ? t("transferOut") : t("transferIn")}
            </TableCell>
            <TableCell className="w-24 text-center">
              <Time time={item.createTime} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="h-40 text-center">
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
      <div className="flex-1 bg-background p-2">
        <div className="relative rounded-sm border">
          <Table>
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await postGetTransferLogList(p);

  return (
    <div className="flex-1 bg-background p-2">
      <div className="relative rounded-sm border">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
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
