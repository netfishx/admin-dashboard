import { getDownloadList } from "@/api";
import { Time } from "@/components/time";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DownloadListRecords } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ActionButton } from "./action-button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = await getTranslations("report.download");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center bg-background p-4 text-sm font-medium">
        {t("list")}
      </div>
      <div className="p-4 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense
            fallback={
              <Table>
                <TableHeaderWrapper />
                <TableBodySkeleton />
              </Table>
            }
          >
            <TableWrapper searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { pageNum = "1", pageSize = "10" } = await searchParams;
  const { data } = await getDownloadList({
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  return (
    <Table>
      <TableHeaderWrapper />
      <TableBodyWrapper list={data?.list} />
    </Table>
  );
}

async function TableHeaderWrapper() {
  const t = await getTranslations("report.download");
  return (
    <TableHeader className="bg-muted">
      <TableRow>
        <TableHead>{t("name")}</TableHead>
        <TableHead>{t("operateTime")}</TableHead>
        <TableHead>{t("exportTime")}</TableHead>
        <TableHead>{t("status")}</TableHead>
        <TableHead>{t("failReason")}</TableHead>
        <TableHead className="text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableBodyWrapper({
  list,
}: {
  list: DownloadListRecords[] | undefined;
}) {
  const translation = await getTranslations();
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.exportFileName}</TableCell>
            <TableCell>
              {item.operateTime ? <Time time={item.operateTime} /> : null}
            </TableCell>
            <TableCell>
              {item.endTime ? <Time time={item.endTime} /> : null}
            </TableCell>
            <TableCell>
              <ShowStatusLable status={item.status} />
            </TableCell>
            <TableCell>{item.failReason}</TableCell>
            <TableCell className="text-center">
              <ActionButton fileUrl={item.exportFileUrl} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow className="text-center">
          <TableCell colSpan={7} className="h-40">
            {translation("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

async function ShowStatusLable({ status }: { status: number }) {
  const t = await getTranslations("report.download");
  if (status === 0) {
    return (
      <span className="inline-block w-20 rounded-sm bg-primary/20 p-1 text-center text-primary">
        {t("initializing")}
      </span>
    );
  }
  if (status === 1) {
    return (
      <span className="inline-block w-20 rounded-sm bg-primary/20 p-1 text-center text-primary">
        {t("exporting")}
      </span>
    );
  }
  if (status === 2) {
    return (
      <span className="inline-block w-20 rounded-sm bg-green/20 p-1 text-center text-green">
        {t("exported")}
      </span>
    );
  }
  if (status === 99) {
    return (
      <span className="inline-block w-20 rounded-sm bg-destructive/20 p-1 text-center text-destructive">
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
          <TableCell colSpan={7}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
