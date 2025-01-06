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
import { NOTICE_TYPE } from "@/lib/dict";
import type { PageData } from "@/lib/types";
import type { AnnouncementList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TruncatedCell } from "../truncated-cell";

export async function List({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const search = await searchParams;

  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    level: 1, // 上级
  });

  return (
    <div>
      <div className="rounded-sm border">
        <Table className="table-fixed">
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
        <TableHead className="w-48">{t("endTime")}</TableHead>
        <TableHead className="w-48">{t("type")}</TableHead>
        <TableHead className="w-[450px]">{t("content")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export async function TableBodyWrapper({
  data,
}: {
  data?: PageData<AnnouncementList>;
}) {
  const translations = await getTranslations();
  const t = await getTranslations("system.announcement");

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Time time={item.endTime} />
            </TableCell>
            <TableCell>
              {(() => {
                const status = NOTICE_TYPE.find((s) => s.value === item.type);
                return status ? t(status.label) : item.type;
              })()}
            </TableCell>

            <TruncatedCell
              type={item.type}
              content={item.contentOfLanguage}
              maxLength={50}
            />
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="h-48 text-center">
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
