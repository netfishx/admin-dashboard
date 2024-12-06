import { getSupplierReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  GameInfo,
  SupplierReportRecords,
  SupplierReportRequestParams,
} from "@/lib/types";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("supplierID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("supplierName")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("date")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("game")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("betNum")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("validAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("proportionAmount")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList = [],
}: { list: SupplierReportRecords[]; gameList?: GameInfo[] }) {
  const translate = await getTranslations();

  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={nanoid()}>
            <TableCell className="w-24 text-center">{item.supplyId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.supplyName}
            </TableCell>
            <TableCell className="w-24 text-center">{item.openDay}</TableCell>
            <TableCell className="w-24 text-center">
              {gameList?.find((i) => i.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
            <TableCell className="w-24 text-center">
              {item.availableBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.percentAmount}
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
  gameList,
}: {
  searchParams: Promise<SupplierReportRequestParams>;
  gameList: GameInfo[];
}) {
  const t = await getTranslations("report.supplier");
  const params = await searchParams;
  const p = {
    ...params,
    startTime: Number(params?.startTime || 0),
    endTime: Number(params?.endTime || 0),
    pageNum: Number(params?.pageNum || 1),
    pageSize: Number(params?.pageSize || 10),
  };
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="p-2 bg-background flex-1">
        <div className="h-6" />
        <div className="border rounded-sm relative">
          <Table>
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getSupplierReportList(p);

  return (
    <div className="p-2 bg-background flex-1">
      <div className="h-6">
        {data?.list && data?.list?.length > 0 && (
          <>
            <Label className="min-w-24 text-center text-sm">
              {t("betNum")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list?.[0]?.totalBetNum || 0} &nbsp;
            </span>
            <Label className="min-w-24 text-center text-sm">
              {t("betAmount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list?.[0]?.totalAvailableBetAmount || 0} &nbsp;
            </span>
            <Label className="min-w-24 text-center text-sm">
              {t("validBetAmount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list?.[0]?.totalPercentAmount || 0} &nbsp;
            </span>
          </>
        )}
      </div>

      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense
            fallback={
              <div className="flex justify-between items-center bg-background p-4">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            }
          >
            <ListBody list={data?.list || []} gameList={gameList || []} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total || 0}
          currentPage={data?.pageNum || 1}
          pageSize={data?.pageSize || 10}
        />
      </div>
    </div>
  );
}
