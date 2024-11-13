import Pages from "@/components/custom-pagination";
import { Empty } from "@/components/empty";
import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
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
import { Actions } from "../actions";
import { formatTimestamp } from "../tools";
import { AddAnnouncement } from "./add-announcement";

export async function List({
  data,
}: {
  data?: WithPagination & { list: AnnouncementList[] };
}) {
  const t = await getTranslations("system.announcement");

  return (
    <>
      <div className="p-2 mt-2 bg-background flex-1 gap-2">
        <AddAnnouncement />
        <ListScrollArea>
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
                {data?.list && data.list.length > 0 ? (
                  data?.list?.map((item) => (
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
                        {item.content}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.type}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        <Actions data={item} showEdit={true} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Empty colSpan={6} />
                )}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
        <div className="pt-2">
          <Pages
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      </div>
    </>
  );
}
