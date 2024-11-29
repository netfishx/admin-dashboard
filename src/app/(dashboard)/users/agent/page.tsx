import { getAgents } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { AddAgent } from "./add-agent";
import { Form } from "./form";
import { Modals } from "./modals";
import { TableBodySkeleton, TableBodyWrapper } from "./table-wrapper";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const session = getSession();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton />
          </div>
        }
      >
        <Form session={session} />
      </Suspense>
      <div className="p-2 bg-background flex-1 gap-2">
        <div className="pb-2 flex justify-end">
          <AddAgent />
        </div>
        <Suspense
          fallback={
            <Table className="border rounded-sm">
              <TableHeaderWrapper total={0} />
              <TableBodySkeleton />
            </Table>
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
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { pageNum = "1", pageSize = "10", ...rest } = await searchParams;
  const { data } = await getAgents({
    ...rest,
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  const session = await getSession();
  const permissions = session?.permissions;
  console.info("agent list:", data);
  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <TableHeaderWrapper total={data?.total ?? 0} />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper list={data?.list} permissions={permissions} />
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
    </>
  );
}
async function TableHeaderWrapper({ total }: { total: number }) {
  const t = await getTranslations("users.agents");
  const session = await getSession();
  const permissions = session?.permissions;
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        {permissions?.includes("agent_search") && (
          <>
            <TableHead className="min-w-28">{t("upUsername")}</TableHead>
            <TableHead className="min-w-28">{t("deptId")}</TableHead>
          </>
        )}
        <TableHead className="min-w-60">{t("userId")}</TableHead>
        <TableHead>{t("username")}</TableHead>
        <TableHead className="min-w-20">{t("nickname")}</TableHead>
        <TableHead className="min-w-20">{t("status")}</TableHead>
        {total > 0 && (
          <TableHead className="min-w-[480px] text-center sticky right-0 bg-muted">
            {t("action")}
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
}
