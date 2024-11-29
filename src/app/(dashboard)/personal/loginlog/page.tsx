import { getAgentLoginLog } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import type { LoginLog } from "@/lib/types";
import { getSession } from "@/session";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background p-4">
        <Form />
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense fallback={<TableSkeleton />}>
            <TableWrapper searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
function TableSkeleton() {
  return (
    <Table>
      <TableHeaderWrapper />
      <TableBodySkeleton />
    </Table>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string }> }) {
  const {
    pageNum = "1",
    pageSize = "10",
    startTime,
    endTime,
    ip,
  } = await searchParams;
  const user = await getSession();
  if (!(startTime && endTime && user?.mainId)) {
    return <TableSkeleton />;
  }
  const { data } = await getAgentLoginLog({
    agentId: user.mainId,
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
    startTime: Number(startTime),
    endTime: Number(endTime),
    ip,
  });
  return (
    <Table>
      <TableHeaderWrapper />
      <TableBodyWrapper list={data?.list ?? []} username={user?.username} />
    </Table>
  );
}

async function TableHeaderWrapper() {
  "use cache";
  const t = await getTranslations("users.agents");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("loginUsername")}</TableHead>
        <TableHead>{t("loginTime")}</TableHead>
        <TableHead>{t("ip")}</TableHead>
        <TableHead>{t("address")}</TableHead>
        <TableHead>{t("status")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableBodyWrapper({
  list,
  username,
}: { list: LoginLog[]; username: string }) {
  const t = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TableRow key={index}>
            <TableCell>{username}</TableCell>
            <TableCell>
              {format(item.loginTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell>{item.ip}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <StatusCell status={item.status} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-40">
            {t("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

async function StatusCell({ status }: { status: number }) {
  const t = await getTranslations("users.agents");
  if (status === 0) {
    return (
      <span className="p-1 rounded-sm inline-block text-center text-primary bg-primary/20">
        {t("success")}
      </span>
    );
  }
  if (status === 1) {
    return (
      <span className="p-1 rounded-sm inline-block text-center text-destructive bg-destructive/20">
        {t("failed")}
      </span>
    );
  }
}

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={5}>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
