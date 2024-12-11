import { getSameOrSeniorAnno } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
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
import type { AnnouncementList, PageData } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { EditBtn } from "../edit-btn";
import { TruncatedCell } from "../truncated-cell";
import { AddBtn } from "./add-btn";

export async function List({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { loading, pageSize, pageNum } = await searchParams;

  if (loading === "true") {
    return (
      <div>
        <AddBtn />
        <Table>
          <TableHeaderWrapper />
          <TableBodySkeleton />
        </Table>
      </div>
    );
  }

  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    level: 0, // 本级
  });

  return (
    <div className="p-2 gap-2 flex flex-col h-full bg-background">
      <AddBtn />
      <div className="border rounded-sm">
        <Table>
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper data={data} />
          </Suspense>
        </Table>
      </div>
      {Number(data?.total) > 0 && (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      )}
    </div>
  );
}

export async function TableHeaderWrapper() {
  const t = await getTranslations("system.announcement");

  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-32 min-w-32 text-center">
          {t("startTime")}
        </TableHead>
        <TableHead className="w-32 min-w-32 text-center">
          {t("endTime")}
        </TableHead>
        <TableHead className="w-32 min-w-32 text-center">
          {t("createTime")}
        </TableHead>
        <TableHead className="w-[450px] min-w-24 text-center">
          {t("content")}
        </TableHead>
        <TableHead className="text-center">{t("type")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
export function TableBodySkeleton() {
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
export async function TableBodyWrapper({
  data,
}: { data?: PageData<AnnouncementList> }) {
  const translations = await getTranslations();

  const noticeTypeMap: { [key: number]: string } = {
    1: "平台代理公告",
    2: "平台会员公告",
    3: "直属代理公告",
    4: "直属会员公告",
    5: "系统配置公告",
    // todo
    6: "占成公告",
    7: "退水公告",
  };

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={Math.random()}>
            <TableCell className="w-24 text-center">
              <Time time={Number(item.startTime)} />
            </TableCell>
            <TableCell className="w-24 text-center">
              <Time time={Number(item.endTime)} />
            </TableCell>
            <TableCell className="w-24 text-center">
              <Time time={Number(item.createTime)} />
            </TableCell>
            <TruncatedCell
              className="w-[550px]"
              type={item.type}
              content={item.contentOfLanguage}
              maxLength={50}
            />
            <TableCell className="text-center">
              {noticeTypeMap[item.type]}
            </TableCell>
            <TableCell className="w-24 text-center">
              <EditBtn data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center h-40">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
