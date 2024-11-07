import Pages from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Announcement, WithPagination } from "@/api";
import { getTranslations } from "next-intl/server";
import { Actions } from "../actions";
import { formatTimestamp } from "../tools";
import { Form } from "./form";

export async function List({
  data,
}: { data?: WithPagination & { list: Announcement[] } }) {
  const t = await getTranslations("system.announcement");
  const user = {
    role: "admin",
  };
  return (
    <>
      <div className="p-2 mt-2 bg-background flex-1">
        {user.role === "admin" && <Form />}
        <Table>
          <TableHeader className="sticky">
            <TableRow className="bg-muted">
              {user.role === "admin" && (
                <TableHead className="w-24 min-w-24 text-center">
                  {t("startTime")}
                </TableHead>
              )}
              <TableHead className="w-24 min-w-24 text-center">
                {t("endTime")}
              </TableHead>
              {user.role === "admin" && (
                <TableHead className="w-24 min-w-24 text-center">
                  {t("createTime")}
                </TableHead>
              )}
              {user.role === "admin" && (
                <TableHead className="w-24 min-w-24 text-center">
                  {t("type")}
                </TableHead>
              )}
              {user.role === "admin" && (
                <TableHead className="w-24 min-w-24 text-center">
                  {t("agentId")}
                </TableHead>
              )}
              <TableHead className="w-24 min-w-24 text-center">
                {t("content")}
              </TableHead>
              <TableHead className="w-24 min-w-24 text-center">
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.list?.map((item: Announcement) => (
              <TableRow key={Math.random()}>
                {user.role === "admin" && (
                  <TableCell className="w-24 text-center">
                    {formatTimestamp(item.startTime)}
                  </TableCell>
                )}
                <TableCell className="w-24 text-center">
                  {formatTimestamp(item.endTime)}
                </TableCell>
                {user.role === "admin" && (
                  <TableCell className="w-24 text-center">
                    {formatTimestamp(item.createTime)}
                  </TableCell>
                )}
                {user.role === "admin" && (
                  <TableCell className="w-24 min-w-24 text-center">
                    {item.type}
                  </TableCell>
                )}
                {user.role === "admin" && (
                  <TableCell className="w-24 min-w-24 text-center">
                    {item.agentId}
                  </TableCell>
                )}
                <TableCell className="w-24 text-center">
                  {item.content}
                </TableCell>
                <TableCell className="w-24 text-center">
                  <Actions data={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
