import { getAnnouncement } from "@/api";
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
import type { PageData } from "@/lib/types";
import type { AnnouncementList } from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TruncatedCell } from "../truncated-cell";

export async function List({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { startTime, endTime, userId, pageNum, pageSize } = await searchParams;
  if (!startTime || !endTime) {
    return (
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const { data } = await getAnnouncement({
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    startLastTime: Number(startTime),
    endLastTime: Number(endTime),
    userId: (userId ?? "") as string,
  });

  return (
    <div>
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
        {/* admin permission */}
        <TableHead className="w-32 min-w-32 text-center">
          {t("startTime")}
        </TableHead>

        <TableHead className="w-32 min-w-32 text-center">
          {t("endTime")}
        </TableHead>

        {/* admin permission */}
        <TableHead className="w-32 min-w-32 text-center">
          {t("createTime")}
        </TableHead>

        {/* admin permission */}
        <TableHead className="text-center">{t("type")}</TableHead>

        {/* admin permission */}
        <TableHead className="text-center">{t("userId")}</TableHead>

        <TableHead className="w-[450px] min-w-24 text-center">
          {t("content")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export async function TableBodyWrapper({
  data,
}: { data?: PageData<AnnouncementList> }) {
  const translations = await getTranslations();

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            {/* admin permission */}
            <TableCell className="w-24 text-center">
              {format(Number(item.startTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>

            <TableCell className="w-24 text-center">
              {format(Number(item.endTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            {/* admin permission */}
            <TableCell className="w-24 text-center">
              {format(Number(item.createTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>

            {/* admin permission */}
            <TableCell className="text-center">{item.type}</TableCell>

            {/* admin permission */}
            <TableCell className="text-center">{item.userId}</TableCell>

            <TruncatedCell content={item.contentOfLanguage} maxLength={50} />
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="text-center h-40">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
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
