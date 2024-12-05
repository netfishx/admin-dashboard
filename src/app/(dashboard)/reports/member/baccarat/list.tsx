import { getMemberReportList } from "@/api";
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
  MemberReportRequestParams,
  MemberReportsRecord,
} from "@/lib/types";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import DetailButton from "./detail-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.member");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">{t("member_id")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("member_type")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("game_name")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("bet_count")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("bet_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("valid_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("win_loss_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("cashback_amount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("profit_loss_result")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("details")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
}: { list: MemberReportsRecord[]; gameList?: GameInfo[] }) {
  const translate = await getTranslations();

  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: MemberReportsRecord) => (
          <TableRow key={nanoid()}>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.memberTypeName}
            </TableCell>
            <TableCell className="w-24 text-center">
              {
                gameList?.find((game) => game.gameType === item.gameType)
                  ?.gameName
              }
            </TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
            <TableCell className="w-24 text-center">
              {item.memberBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.availableBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.winLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.pureBackAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.profitLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
              <DetailButton item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="text-center h-40">
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
  searchParams: Promise<MemberReportRequestParams>;
  gameList: GameInfo[];
}) {
  const t = await getTranslations("report.member");
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params?.pageNum || 1),
    pageSize: Number(params?.pageSize || 10),
    startTime: Number(params?.startTime || 0),
    endTime: Number(params?.endTime || 0),
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
  const { data } = await getMemberReportList(p);

  return (
    <div className="p-2 bg-background flex-1">
      <div className="h-6">
        {data?.list && data?.list?.length > 0 && (
          <>
            <Label className="min-w-24 text-center text-sm">
              {t("bet_count")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalBetNum} &nbsp;
            </span>

            <Label className="min-w-24 text-center text-sm">
              {t("bet_amount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalMemberBetAmount} &nbsp;
            </span>

            <Label className="min-w-24 text-center text-sm">
              {t("valid_amount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalAvailableBetAmount} &nbsp;
            </span>

            <Label className="min-w-24 text-center text-sm">
              {t("win_loss_amount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalWinLossAmount} &nbsp;
            </span>

            <Label className="min-w-24 text-center text-sm">
              {t("cashback_amount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalPureBackAmount} &nbsp;
            </span>

            <Label className="min-w-24 text-center text-sm">
              {t("profit_loss_result")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalProfitLossAmount} &nbsp;
            </span>
          </>
        )}
      </div>

      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
            <ListBody list={data?.list ?? []} gameList={gameList || []} />
          </Suspense>
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
  );
}
