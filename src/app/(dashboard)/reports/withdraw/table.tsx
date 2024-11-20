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
import type { WithdrawReport } from "@/lib/types";
import type { PageData } from "@/lib/types";
import { getTranslations } from "next-intl/server";

async function WithdrawTableHeader() {
  const t = await getTranslations("report.withdraw");
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
          {t("withdrawMoney")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("withdrawFee")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("status")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("applyTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("approverTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("finishTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("withdrawHash")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
export async function WithdrawTable({
  data,
}: { data?: PageData<WithdrawReport> }) {
  const t = await getTranslations();
  return (
    <div className="border rounded-sm">
      <Table>
        <WithdrawTableHeader />
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
                  {item.withdrawMoney}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.withdrawFee}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.status}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.applyTime}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.approverTime}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.finishTime}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  <Button variant="link" size="icon">
                    {item.withdrawHash}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center h-40">
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
