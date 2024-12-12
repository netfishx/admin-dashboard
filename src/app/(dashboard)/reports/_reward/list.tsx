import { postGetRewardRecordList } from "@/api";
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
  RewardRecordRequestParams,
  RewardRecordRequestRecords,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.reward");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("orderNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("memberId")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("roomOwnerId")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("ministerId")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("amount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: RewardRecordRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.transactionID}>
            <TableCell className="w-24 text-center">
              {item.transactionID}
            </TableCell>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.houseOwnerId}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.ministerId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.amount}</TableCell>
            <TableCell className="w-24 text-center">
              <Time time={item.createTime} />
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
}: { searchParams: Promise<RewardRecordRequestParams> }) {
  const params = await searchParams;
  const { data } = await postGetRewardRecordList(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
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
