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
import { formatNumber } from "@/lib/utils";
import { type SessionData, getSession } from "@/session";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import AgentId from "./agentId";
import DetailButton from "./detail-button";

export async function ListHeader({
  hasSearchPermission,
}: {
  hasSearchPermission: boolean;
}) {
  "use cache";
  const t = await getTranslations("report.member");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("memberId")}</TableHead>
        <TableHead className="w-60">{t("parentAgentId")}</TableHead>
        {hasSearchPermission && (
          <TableHead className="w-60">{t("agentId")}</TableHead>
        )}
        <TableHead className="w-36">{t("member_type")}</TableHead>
        <TableHead className="w-60">{t("game_name")}</TableHead>
        <TableHead className="w-24">{t("bet_count")}</TableHead>
        <TableHead className="w-40">{t("bet_amount")}</TableHead>
        <TableHead className="w-40">{t("valid_amount")}</TableHead>
        <TableHead className="w-40">{t("win_loss_amount")}</TableHead>
        <TableHead className="w-40">{t("cashback_amount")}</TableHead>
        <TableHead className="w-40">{t("profit_loss_result")}</TableHead>
        <TableHead className="sticky right-0 w-24 bg-muted p-0">
          <div className="flex h-full items-center justify-center px-4 shadow-l">
            {t("details")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
  hasSearchPermission,
}: {
  list: MemberReportsRecord[];
  gameList?: GameInfo[];
  hasSearchPermission: boolean;
}) {
  const session = await getSession();
  const translate = await getTranslations();
  const t = await getTranslations("report.member");

  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: MemberReportsRecord) => (
          <TableRow key={nanoid()}>
            <TableCell>{item.memberId}</TableCell>
            <TableCell>{item.parentAgentId}</TableCell>
            {hasSearchPermission && (
              <TableCell>
                <AgentId session={session as SessionData} />
              </TableCell>
            )}
            <TableCell>{item.memberTypeName}</TableCell>
            <TableCell>
              {item.gameId
                ? gameList?.find((game) => game.gameId === item.gameId)
                    ?.gameName
                : t("all")}
            </TableCell>
            <TableCell>{item.betNum}</TableCell>
            <TableCell>
              {formatNumber(Number(item.memberBetAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.availableBetAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.winLossAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.pureBackAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.profitLossAmount || 0))}
            </TableCell>
            <TableCell className="sticky right-0 bg-background p-0">
              <div className="flex items-center justify-center px-4 py-2 shadow-l">
                <DetailButton item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasSearchPermission ? 12 : 11}
            className="h-48 text-center"
          >
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
  hasSearchPermission,
}: {
  searchParams: Promise<MemberReportRequestParams>;
  gameList: GameInfo[];
  hasSearchPermission: boolean;
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
            <ListHeader hasSearchPermission={hasSearchPermission} />
            <TableSkeleton length={5} colSpan={11} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getMemberReportList(p);

  return (
    <div className="flex-1 bg-background p-4">
      <div className="flex h-6 gap-4">
        {data?.list && data?.list?.length > 0 && (
          <>
            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("bet_count")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalBetNum) || 0)}
              </span>
            </div>

            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("bet_amount")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalMemberBetAmount || 0))}
              </span>
            </div>

            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("valid_amount")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(
                  Number(data?.list[0]?.totalAvailableBetAmount || 0),
                )}
              </span>
            </div>

            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("win_loss_amount")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalWinLossAmount || 0))}
              </span>
            </div>

            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("cashback_amount")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalPureBackAmount || 0))}
              </span>
            </div>

            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("profit_loss_result")}：
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(
                  Number(data?.list[0]?.totalProfitLossAmount || 0),
                )}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="relative mt-2 rounded-sm border">
        <Table className="table-fixed">
          <ListHeader hasSearchPermission={hasSearchPermission} />
          <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
            <ListBody
              list={data?.list ?? []}
              gameList={gameList || []}
              hasSearchPermission={hasSearchPermission}
            />
          </Suspense>
        </Table>
      </div>
      {data?.list && data?.list?.length > 0 ? (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(params?.pageNum ?? 1)}
            pageSize={Number(params?.pageSize ?? 10)}
          />
        </div>
      ) : null}
    </div>
  );
}
