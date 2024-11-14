import { CustomPagination } from "@/components/custom-pagination";
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
  const user = {
    role: "admin",
  };
  console.info("data", data);
  return (
    <>
      <div className="p-2 mt-2 bg-background flex-1 ">
        {user.role === "admin" && <Form />}
        <div className="max-h-[calc(100dvh-280px)] overflow-y-auto">
          <div className="p-2 bg-background flex-1 gap-2 ">
            <Suspense fallback={null}>
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
                        {/* {t("content")} */}
                      </TableHead>
                      <TableHead className="w-24 min-w-24 text-center">
                        {t("action")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
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
                          {/* {item.content} */}
                        </TableCell>
                        <TableCell className="w-24 text-center">
                          <ViewBtn data={item} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Suspense>
          </div>
          <div className="pt-2">
            <CustomPagination
              total={data?.total ?? 0}
              currentPage={Number(data?.pageNum ?? 1)}
              pageSize={Number(data?.pageSize ?? 10)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
