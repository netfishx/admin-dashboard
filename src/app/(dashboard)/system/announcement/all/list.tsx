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
import { formatTimestamp } from "../tools";
import { ViewBtn } from "../view-btn";

export async function List({ data }: { data?: PageData<AnnouncementList> }) {
  const t = await getTranslations("system.announcement");
  const translations = await getTranslations();

  console.info("data", data);
  return (
    <div className="border rounded-sm relative overflow-y-auto overflow-x-auto">
      <Table>
        <TableHeader>
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
        <TableBody>
          {data && data.list.length > 0 ? (
            data.list.map((item) => (
              <TableRow key={item.id}>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center h-40">
                {translations("noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
