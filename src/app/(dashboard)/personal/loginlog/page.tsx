import { getMySelfLoginLog } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Time } from "@/components/time";
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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between bg-background p-4">
        <Form />
      </div>
      <div className="p-4 bg-background flex-1">
        <Suspense fallback={<TableSkeleton />}>
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
function TableSkeleton() {
  return (
    <Table className="table-fixed rounded-sm border">
      <TableHeaderWrapper />
      <TableBodySkeleton />
    </Table>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
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
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime),
    endTime: Number(endTime),
    ...rest,
  });
  return (
    <>
      <div className="mb-2 rounded-sm border">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <TableBodyWrapper list={data?.list ?? []} />
        </Table>
      </div>
      {!!data?.total && (
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(pageNum ?? 1)}
          pageSize={Number(pageSize ?? 10)}
        />
      )}
    </>
  );
}

async function TableHeaderWrapper() {
  "use cache";
  const t = await getTranslations("users.agents");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-32">{t("loginUsername")}</TableHead>
        <TableHead className="w-48">{t("loginTime")}</TableHead>
        <TableHead className="w-32">{t("ip")}</TableHead>
        <TableHead className="w-48">{t("address")}</TableHead>
        <TableHead className="w-24">{t("status")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableBodyWrapper({ list }: { list: MySelfLoginLog[] }) {
  const t = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.username}</TableCell>
            <TableCell>
              <Time time={item.createTime} />
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
          <TableCell colSpan={5} className="h-40 text-center">
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
      <span className="inline-block rounded-sm bg-primary/20 p-1 text-center text-primary">
        {t("success")}
      </span>
    );
  }
  if (status === "1") {
    return (
      <span className="inline-block rounded-sm bg-destructive/20 p-1 text-center text-destructive">
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
