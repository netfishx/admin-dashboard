import { getSupplierReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Label } from "@/components/ui/label";
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

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-40">{t("supplierId")}</TableHead>
        <TableHead className="w-40">{t("supplierName")}</TableHead>
        <TableHead className="w-40">{t("date")}</TableHead>
        <TableHead className="w-40">{t("game")}</TableHead>
        <TableHead className="w-40">{t("betNum")}</TableHead>
        <TableHead className="w-40">{t("validAmount")}</TableHead>
        <TableHead className="w-40">{t("proportionAmount")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList = [],
}: {
  list: SupplierReportRecords[];
  gameList?: GameInfo[];
}) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={nanoid()}>
            <TableCell>{item.supplyId}</TableCell>
            <TableCell>{item.supplyName}</TableCell>
            <TableCell>{item.openDay}</TableCell>
            <TableCell>
              {gameList?.find((i) => i.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell>{item.betNum}</TableCell>
            <TableCell>{item.availableBetAmount}</TableCell>
            <TableCell>{item.percentAmount}</TableCell>
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
      <div className="flex-1 bg-background p-2">
        <div className="h-6" />
        <div className="relative rounded-sm border">
          <Table>
            <ListHeader />
            <TableSkeleton length={5} colSpan={7} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getSupplierReportList(p);

  return (
    <div className="flex-1 bg-background p-2">
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

      <div className="relative rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <ListBody list={data?.list || []} gameList={gameList || []} />
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
