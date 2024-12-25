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
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const session = getSession();
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background p-4">
            <Skeleton className="h-9" />
          </div>
        }
      >
        <Form session={session} />
      </Suspense>
      <div className="p-4 bg-background flex-1 gap-2">
        <div className="pb-2 flex justify-end">
          <AddAgent />
        </div>
        <Suspense
          fallback={
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <TableHeaderWrapper />
                <TableBodySkeleton session={session} />
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
  const { pageNum = "1", pageSize = "10", ...rest } = await searchParams;
  const { data } = await getAgents({
    ...rest,
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  const session = getSession();

  return (
    <>
      <div className="rounded-sm border">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <TableBodyWrapper list={data?.list} session={session} />
        </Table>
      </div>
      <div className="pt-2">
        {!!data?.total && (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(pageNum ?? 1)}
            pageSize={Number(pageSize ?? 10)}
          />
        )}
      </div>
    </>
  );
}
async function TableHeaderWrapper() {
  const t = await getTranslations("users.agents");
  const session = await getSession();
  const permissions = session?.permissions;
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        {permissions?.includes("agent_search") && (
          <>
            <TableHead className="w-32">{t("upUsername")}</TableHead>
            <TableHead className="w-20">{t("deptId")}</TableHead>
          </>
        )}
        <TableHead className="w-60">{t("userId")}</TableHead>
        <TableHead className="w-32">{t("username")}</TableHead>
        <TableHead className="w-32">{t("nickname")}</TableHead>
        <TableHead className="w-20 text-center">{t("status")}</TableHead>
        <TableHead className="sticky right-0 w-100 bg-muted text-center p-0">
          <div className="shadow-l h-full px-4 flex justify-center items-center">
            {t("action")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
