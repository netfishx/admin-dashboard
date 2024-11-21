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
import type { AnnouncementList, WithPagination } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { EditBtn } from "../edit-btn";
import { formatTimestamp } from "../tools";
import { TruncatedCell } from "../truncated-cell";
import { AddBtn } from "./add-btn";

export async function List({
  data,
}: {
  data?: WithPagination & { list: AnnouncementList[] };
}) {
  const t = await getTranslations("system.announcement");

  return (
    <div className="p-2 mt-2 gap-2 flex flex-col h-full bg-background">
      <AddBtn />
      <div className="border rounded-sm bg-background">
        <Table>
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
              <TableHead className="min-w-24 text-center">
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <Suspense
            fallback={
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow key={i}>
                    <TableCell colSpan={10} className="h-40">
                      <Skeleton className="w-full h-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
          >
            <TableBody>
              {data?.list?.map((item) => (
                <TableRow key={Math.random()}>
                  <TableCell className="w-24 text-center">
                    {formatTimestamp(item.startTime)}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {formatTimestamp(item.endTime)}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {formatTimestamp(item.createTime)}
                  </TableCell>
                  <TruncatedCell
                    content={item.contentOfLanguage}
                    maxLength={50}
                  />
                  <TableCell className="text-center">{item.type}</TableCell>
                  <TableCell className="w-24 text-center">
                    <EditBtn data={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
