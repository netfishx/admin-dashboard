import type { Announcement, WithPagination } from "@/api";
import Pages from "@/components/custom-pagination";
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
import { getTranslations } from "next-intl/server";
import { Actions } from "../actions";
import { formatTimestamp } from "../tools";
import { AddAnnouncement } from "./add-announcement";

export async function List({
  data,
  announcementDicts,
}: {
  data?: WithPagination & { list: Announcement[] };
  announcementDicts: { key: string; value: string }[];
}) {
  const t = await getTranslations("system.announcement");

  return (
    <>
      <div className="p-2 mt-2 bg-background flex-1 gap-2">
        <AddAnnouncement announcementDicts={announcementDicts} />
        <ListScrollArea>
          <div className="max-h-[calc(100dvh-220px)] overflow-y-auto">
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
                {data?.list?.map((item: any) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <Pages
          total={data?.total ?? 0}
          currentPage={Number(data?.page ?? 1)}
          pageSize={Number(data?.size ?? 10)}
        />
      </div>
    </>
  );
}
