import { CustomPagination } from "@/components/custom-pagination";
import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PageData, SupplierReportRecords } from "@/lib/types";
import { getTranslations } from "next-intl/server";

export async function List({
  data,
}: { data: PageData<SupplierReportRecords> }) {
  const t = await getTranslations("report.supplier");
  const translate = await getTranslations();
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("supplierID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("supplierName")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("date")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("game")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("betNum")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("validAmount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("proportionAmount")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.length > 0 ? (
                data?.list?.map((item) => (
                  <TableRow key={item.supplierId}>
                    <TableCell className="w-24 text-center">
                      {item.supplierId}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.gameName}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.analysisTime}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.gameId}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.betNum}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.validAmount}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.shareAmount}
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
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total}
          currentPage={data?.pageNum}
          pageSize={data?.pageSize}
        />
      </div>
      <div className="pt-2 w-2/5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("betNum")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("betAmount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("validBetAmount")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">
                {data?.list?.[0]?.totalBetNum ?? 0}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list?.[0]?.totalValidAmount ?? 0}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list?.[0]?.totalShareAmount ?? 0}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
