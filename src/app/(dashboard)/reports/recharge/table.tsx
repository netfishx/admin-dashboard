import { CustomPagination } from "@/components/custom-pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RechargeReport } from "@/lib/types";
import type { PageData } from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";

async function RechargeTableHeader() {
  const t = await getTranslations("report.recharge");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-24 min-w-24 text-center">
          {t("orderNo")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("userId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("currency")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("rechargeMoney")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("finishTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("rechargeHash")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
export async function RechargeTable({
  data,
}: { data?: PageData<RechargeReport> }) {
  const t = await getTranslations();
  return (
    <div className="border rounded-sm">
      <Table>
        <RechargeTableHeader />
        <TableBody>
          {data && data.list.length > 0 ? (
            data.list.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.orderNo}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.userId}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.currency}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.rechargeMoney}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {format(item.finishTime, "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  <Button variant="link" size="icon">
                    {item.rechargeHash}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-40">
                {t("noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {Number(data?.total) > 0 && (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      )}
    </div>
  );
}
