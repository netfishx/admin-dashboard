import { getAnnouncement } from "@/api";
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

export interface Announcement {
  gameId: string;
  openTime: number;
  gametype: number;
  gamename: string;
  content: string;
  betMoneyAmount: string;
}

export async function List() {
  const t = await getTranslations("system.announcement");
  const { data } = await getAnnouncement<Announcement[]>();
  console.info(data);
  return (
    <>
      <div className="p-2 mt-2 bg-background flex-1">
        <Table>
          <TableHeader className="sticky">
            <TableRow className="bg-muted">
              <TableHead className="w-24 min-w-24 text-center">
                {t("beginTime")}
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
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: any) => (
              <TableRow key={Math.random()}>
                <TableCell className="w-24 text-center">
                  {item.beginTime}
                </TableCell>
                <TableCell className="w-24 text-center">
                  {item.endTime}
                </TableCell>
                <TableCell className="w-24 text-center">
                  {item.createTime}
                </TableCell>
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
    </>
  );
}
