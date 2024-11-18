import { CustomPagination } from "@/components/custom-pagination";
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
import { EditBtn } from "../edit-btn";
import { formatTimestamp } from "../tools";
import { AddBtn } from "./add-btn";
export async function List({
  data,
}: {
  data?: WithPagination & { list: AnnouncementList[] };
}) {
  const t = await getTranslations("system.announcement");

  return (
    <div className="p-2 mt-2 bg-background gap-2 flex flex-col">
      <AddBtn />
      <div className="max-h-[calc(100dvh-220px)] overflow-y-auto border rounded-sm">
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow className="bg-muted">
              <TableHead className="w-24 min-w-24 text-center">
                {t("startTime")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("endTime")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("createTime")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("content")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("type")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
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
                <TableCell className="w-24 text-center">
                  {item.contentOfLanguage}
                </TableCell>
                <TableCell className="w-24 text-center">{item.type}</TableCell>
                <TableCell className="w-24 text-center">
                  <EditBtn data={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
