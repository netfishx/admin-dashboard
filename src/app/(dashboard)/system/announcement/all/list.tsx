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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { formatTimestamp } from "../tools";
import { ViewBtn } from "../view-btn";
import { Form } from "./form";
export async function List({ data }: { data?: PageData<AnnouncementList> }) {
  const t = await getTranslations("system.announcement");

  console.info("data", data);
  return (
    <div className="p-2 mt-2 bg-background flex-1 ">
      {/* form: admin permission */}
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton className="w-full h-9 opacity-20" />
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="max-h-[calc(100dvh-280px)] overflow-y-auto">
        <div className="p-2 bg-background flex-1 gap-2 ">
          <div className="border rounded-sm">
            <Table>
              <TableHeader className="sticky top-0">
                <TableRow className="bg-muted">
                  {/* admin permission */}
                  <TableHead className="w-24 min-w-24 text-center">
                    {t("startTime")}
                  </TableHead>

                  <TableHead className="w-24 min-w-24 text-center">
                    {t("endTime")}
                  </TableHead>

                  {/* admin permission */}
                  <TableHead className="w-24 min-w-24 text-center">
                    {t("createTime")}
                  </TableHead>

                  {/* admin permission */}
                  <TableHead className="w-24 min-w-24 text-center">
                    {t("type")}
                  </TableHead>

                  {/* admin permission */}
                  <TableHead className="w-24 min-w-24 text-center">
                    {t("userId")}
                  </TableHead>

                  <TableHead className="w-24 min-w-24 text-center">
                    {t("content")}
                  </TableHead>
                  <TableHead className="w-24 min-w-24 text-center">
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
                        <TableCell colSpan={2}>
                          <Skeleton className="w-full h-6" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                }
              >
                <TableBody className="max-h-96 overflow-y-auto">
                  {data?.list?.map((item) => (
                    <TableRow key={Math.random()}>
                      {/* admin permission */}
                      <TableCell className="w-24 text-center">
                        {formatTimestamp(item.startTime)}
                      </TableCell>

                      <TableCell className="w-24 text-center">
                        {formatTimestamp(item.endTime)}
                      </TableCell>
                      {/* admin permission */}
                      <TableCell className="w-24 text-center">
                        {formatTimestamp(item.createTime)}
                      </TableCell>

                      {/* admin permission */}
                      <TableCell className="w-24 min-w-24 text-center">
                        {item.type}
                      </TableCell>

                      {/* admin permission */}
                      <TableCell className="w-24 min-w-24 text-center">
                        {item.userId}
                      </TableCell>

                      <TableCell className="w-24 text-center">
                        {item.contentOfLanguage}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        <ViewBtn data={item} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Suspense>
            </Table>
          </div>
        </div>
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
