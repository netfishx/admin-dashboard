import { getSameOrSeniorAnno } from "@/api";
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
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { EditBtn } from "../edit-btn";
import { TruncatedCell } from "../truncated-cell";
import { AddBtn } from "./add-btn";

export async function List({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    level: 0, // 本级
  });
  const noticeTypeMap = {
    "1": "平台公告",
    "2": "代理公告",
    "3": "大厅公告",
    "4": "房间公告",
    "5": "系统配置变更公告",
  } as const;

  const getNoticeTypeName = (type: string) => {
    return noticeTypeMap[type as keyof typeof noticeTypeMap];
  };
  return (
    <div className="p-2 mt-2 gap-2 flex flex-col h-full bg-background">
      <AddBtn />
      <div className="border rounded-sm bg-background">
        <Suspense
          fallback={
            <Table>
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <Table>
            <TableHeaderWrapper />
            <TableBody>
              {data?.list?.map((item) => (
                <TableRow key={Math.random()}>
                  <TableCell className="w-24 text-center">
                    {format(Number(item.startTime), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {format(Number(item.endTime), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {format(Number(item.createTime), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.labelOfLanguage}
                  </TableCell>
                  <TruncatedCell
                    className="w-[550px]"
                    content={item.contentOfLanguage}
                    maxLength={50}
                  />
                  <TableCell className="text-center">
                    {getNoticeTypeName(item.type)}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    <EditBtn data={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Suspense>
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
        <TableHead className="min-w-24 text-center">{t("title")}</TableHead>
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
