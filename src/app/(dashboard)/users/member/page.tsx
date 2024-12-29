import { getMemberList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MemberList } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Actions from "./action-buttons";
import Form from "./form";
import { Modals } from "./modals";
import { UserInfoModal } from "./user-info-modal";

async function FormWrapper() {
  const session = await getSession();
  const permissions = session?.permissions;
  return <Form permissions={permissions} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background p-4">
            <Skeleton className="h-9" />
          </div>
        }
      >
        <FormWrapper />
      </Suspense>
      <div className="bg-background flex-1 gap-2 p-4">
        <Suspense
          fallback={
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <TableHeaderWrapper />
                <TableBodySkeleton />
              </Table>
            </div>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <Modals />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const params = await searchParams;
  const requestParams = {
    pageNum: Number(params.pageNum ?? 1),
    pageSize: Number(params.pageSize ?? 10),
    ...params,
  };
  const { data } = await getMemberList(requestParams);
  const session = await getSession();
  const permissions = session?.permissions ?? [];
  return (
    <>
      <UserInfoModal permissions={permissions} />
      <div className="rounded-sm border">
        <Table className="relative table-fixed">
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper list={data?.list} permissions={permissions} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        {!!data?.total && (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(params.pageNum ?? 1)}
            pageSize={Number(params.pageSize ?? 10)}
          />
        )}
      </div>
    </>
  );
}
async function TableHeaderWrapper() {
  const t = await getTranslations("users.members");
  const session = await getSession();
  const permissions = session?.permissions;
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        {permissions?.includes("member_search") && (
          <>
            <TableHead className="w-32">{t("upUsername")}</TableHead>
            <TableHead className="w-28">{t("deptId")}</TableHead>
          </>
        )}
        <TableHead className="w-60">{t("userId")}</TableHead>
        <TableHead className="w-90">{t("username")}</TableHead>
        <TableHead className="w-90">{t("nickname")}</TableHead>
        <TableHead className="w-90">{t("walletAddress")}</TableHead>
        <TableHead className="w-28">{t("debtAmount")}</TableHead>
        <TableHead className="w-28">{t("creditAmount")}</TableHead>
        <TableHead className="w-24 text-center">{t("status")}</TableHead>
        <TableHead className="w-160 bg-muted sticky right-0 p-0 text-center">
          <div className="shadow-l flex h-full items-center justify-center px-4">
            {t("action")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({
  list,
  permissions,
}: {
  list: MemberList[] | undefined;
  permissions: string[] | undefined;
}) {
  const t = await getTranslations("users.members");
  const translations = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            {permissions?.includes("member_search") && (
              <>
                <TableCell>{item.upUsername}</TableCell>
                <TableCell>{item.level}</TableCell>
              </>
            )}
            <TableCell>{item.id}</TableCell>
            <TableCell className="break-all">{item.username}</TableCell>
            <TableCell className="break-all">{item.nickname}</TableCell>
            <TableCell>{item.depositAddress}</TableCell>
            <TableCell>{formatNumber(item.debtAmount)}</TableCell>
            <TableCell>{formatNumber(item.creditAmount)}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn(
                  "inline-block h-6 w-16 rounded-sm leading-6",
                  item.status === 0 && "bg-green/10 text-green",
                  item.status === 1 && "bg-destructive/10 text-destructive",
                  item.status === 2 && "bg-orange/10 text-orange",
                )}
              >
                {t(`statusLabel.${item.status}`)}
              </span>
            </TableCell>
            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex items-center justify-center px-4 py-2">
                <Actions data={item} permissions={permissions} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={permissions?.includes("member_search") ? 10 : 8}
            className="h-40 text-center"
          >
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

async function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={10}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
