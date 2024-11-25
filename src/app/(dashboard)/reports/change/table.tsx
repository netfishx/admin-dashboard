import { CustomPagination } from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PageData } from "@/lib/types";
import type { WalletLogRecords } from "@/lib/types";
import { getTranslations } from "next-intl/server";

async function ChangeTableHeader() {
  const t = await getTranslations("report.change");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-24 min-w-24 text-center">
          {t("userId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("transactionId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("createdTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("oldBalance")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("transactionAmount")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("newBalance")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("operateType")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
export async function ChangeTable({
  data,
}: { data?: PageData<WalletLogRecords> }) {
  const t = await getTranslations();
  return (
    <div className="border rounded-sm">
      <Table>
        <ChangeTableHeader />
        <TableBody>
          {data && data.list.length > 0 ? (
            data.list.map((item) => (
              <TableRow key={item.transactionId}>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.userId}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.transactionId}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.createdTime}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.oldBalance}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.transactionAmount}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.newBalance}
                </TableCell>
                <TableCell className="w-24 min-w-24 text-center">
                  {item.operateType}
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
