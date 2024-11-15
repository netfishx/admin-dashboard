import { getRechargeReportList } from "@/api";
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
import type { RechargeReportParams } from "@/lib/types";
import { endOfDay, startOfDay } from "date-fns";
import { getTranslations } from "next-intl/server";

async function RechargeTableHeader() {
  "use cache";
  const t = await getTranslations("report.recharge");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("orderNo")}</TableHead>
        <TableHead>{t("userId")}</TableHead>
        <TableHead>{t("currency")}</TableHead>
        <TableHead>{t("rechargeMoney")}</TableHead>
        <TableHead>{t("finishTime")}</TableHead>
        <TableHead>{t("rechargeHash")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export async function RechargeTable({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const {
    userId,
    orderNo,
    operatorSymbol,
    rechargeMoney,
    withdrawUserType,
    startTime,
    endTime,
    pageNum,
    pageSize,
  } = await searchParams;
  const now = Date.now();
  const start = startTime ?? startOfDay(now).getTime();
  const end = endTime ?? endOfDay(now).getTime();
  const params: RechargeReportParams = {
    userId: (userId ?? null) as string,
    orderNo: orderNo ?? null,
    operatorSymbol:
      operatorSymbol !== undefined ? Number(operatorSymbol) : null,
    rechargeMoney: rechargeMoney !== undefined ? Number(rechargeMoney) : null,
    withdrawUserType:
      withdrawUserType !== undefined ? Number(withdrawUserType) : null,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(start),
    endTime: Number(end),
  };
  const { data } = await getRechargeReportList(params);
  const t = await getTranslations();
  return (
    <div>
      <Table>
        <RechargeTableHeader />
        <TableBody>
          {data && data.list.length > 0 ? (
            data.list.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.orderNo}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.currency}</TableCell>
                <TableCell>{item.rechargeMoney}</TableCell>
                <TableCell>{item.finishTime}</TableCell>
                <TableCell>
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
