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
        <TableHead className="w-60">{t("memberId")}</TableHead>
        <TableHead className="w-60">{t("agentUserId")}</TableHead>
        <TableHead className="w-60">{t("member_type")}</TableHead>
        <TableHead className="w-60">{t("game_name")}</TableHead>
        <TableHead className="w-60">{t("bet_count")}</TableHead>
        <TableHead className="w-60">{t("bet_amount")}</TableHead>
        <TableHead className="w-60">{t("valid_amount")}</TableHead>
        <TableHead className="w-60">{t("win_loss_amount")}</TableHead>
        <TableHead className="w-60">{t("cashback_amount")}</TableHead>
        <TableHead className="w-60">{t("profit_loss_result")}</TableHead>
        <TableHead className="sticky right-0 z-10 w-24 bg-muted text-center">
          {t("details")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
}: {
  list: MemberReportsRecord[];
  gameList?: GameInfo[];
}) {
  const translate = await getTranslations();

  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: MemberReportsRecord) => (
          <TableRow key={nanoid()}>
            <TableCell>{item.memberId}</TableCell>
            <TableCell>{item.parentAgentId}</TableCell>
            <TableCell>{item.memberTypeName}</TableCell>
            <TableCell>
              {
                gameList?.find((game) => game.gameType === item.gameType)
                  ?.gameName
              }
            </TableCell>
            <TableCell>{item.betNum}</TableCell>
            <TableCell>{item.memberBetAmount}</TableCell>
            <TableCell>{item.availableBetAmount}</TableCell>
            <TableCell>{item.winLossAmount}</TableCell>
            <TableCell>{item.pureBackAmount}</TableCell>
            <TableCell>{item.profitLossAmount}</TableCell>
            <TableCell className="sticky right-0 z-10 w-24 bg-background text-center">
              <DetailButton item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="h-40 text-center">
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
      <div className="flex-1 bg-background p-4">
        <div className="h-6" />
        <div className="relative rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={11} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getMemberReportList(p);

  return (
    <div className="flex-1 bg-background p-4">
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

      <div className="relative rounded-sm border">
        <Table className="table-fixed">
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
