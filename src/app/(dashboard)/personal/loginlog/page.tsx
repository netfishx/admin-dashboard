import { getMySelfLoginLog } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import type { MySelfLoginLog } from "@/lib/types";
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
    ...rest
  } = await searchParams;
  if (!(startTime && endTime)) {
    return <TableSkeleton />;
  }
  const { data } = await getMySelfLoginLog({
    pageNum: Number(pageNum) ?? 1,
    pageSize: Number(pageSize) ?? 10,
    startTime: Number(startTime),
    endTime: Number(endTime),
    ...rest,
  });
  return (
    <Table>
      <TableHeaderWrapper />
      <TableBodyWrapper list={data?.list ?? []} />
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

async function TableBodyWrapper({ list }: { list: MySelfLoginLog[] }) {
  const t = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TableRow key={index}>
            <TableCell>{item.username}</TableCell>
            <TableCell>
              {format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell>{item.ip}</TableCell>
            <TableCell>{item.region}</TableCell>
            <TableCell>
              <StatusCell status={item.isSuccess} />
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

async function StatusCell({ status }: { status: string }) {
  const t = await getTranslations("users.agents");
  if (status === "0") {
    return (
      <span className="p-1 rounded-sm inline-block text-center text-primary bg-primary/20">
        {t("success")}
      </span>
    );
  }
  if (status === "1") {
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
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
