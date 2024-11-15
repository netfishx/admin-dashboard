import { getCollectionAddressList } from "@/api";
import DetailButton from "@/app/(dashboard)/fund/collection/detail-button";
import { CustomPagination } from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function List({ searchParams }: { searchParams: any }) {
  const t = await getTranslations("fund.collection");
  const search = await searchParams;
  const { data } = await getCollectionAddressList(search);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm relative">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("address")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("currency")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("balance")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("status")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("createTime")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.map((item: any) => (
                <TableRow key={item.agentId}>
                  <TableCell className="w-32 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-12 text-center sticky right-0 z-10 bg-background">
                    <DetailButton id={item.agentId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
    </Suspense>
  );
}
