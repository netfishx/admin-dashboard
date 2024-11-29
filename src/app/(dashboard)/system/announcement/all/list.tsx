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
import type { PageData } from "@/lib/types";
import type { AnnouncementList } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TruncatedCell } from "../truncated-cell";

export async function List({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;

  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    level: 1, // 上级
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
        <TableHead className="w-32 min-w-32 text-center">
          {t("endTime")}
        </TableHead>
        <TableHead className="text-center">{t("type")}</TableHead>
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
            <TableCell className="w-24 text-center">
              {format(Number(item.endTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center">
              <span
                className={cn(
                  "mr-2 px-2 py-1 inline-block rounded-sm",
                  `${item.type === "1" ? "text-primary bg-primary/10" : "text-orange bg-orange/10"}`,
                )}
              >
                {item.type === "1" ? "平台" : "代理"}
              </span>
            </TableCell>

            <TruncatedCell content={item.contentOfLanguage} maxLength={50} />
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-40">
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
          <TableCell colSpan={3}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
