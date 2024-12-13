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
import type { AnnouncementList, PageData } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { EditBtn } from "../edit-btn";
import { TruncatedCell } from "../truncated-cell";

export async function List({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { pageSize, pageNum } = await searchParams;

  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    level: 0, // 本级
  });

  return (
    <div className="p-2 gap-2 flex flex-col h-full bg-background">
      <div className="border rounded-sm">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <TableBodyWrapper data={data} />
        </Table>
      </div>
      {!!data?.total && (
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
        <TableHead className="w-48">{t("startTime")}</TableHead>
        <TableHead className="w-48">{t("endTime")}</TableHead>
        <TableHead className="w-48">{t("createTime")}</TableHead>
        <TableHead className="w-[450px]">{t("content")}</TableHead>
        <TableHead className="w-32">{t("type")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
export function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={10}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
export async function TableBodyWrapper({
  data,
}: {
  data?: PageData<AnnouncementList>;
}) {
  const translations = await getTranslations();

  const noticeTypeMap: { [key: number]: string } = {
    1: "平台代理公告",
    2: "平台会员公告",
    3: "直属代理公告",
    4: "直属会员公告",
    5: "系统配置公告",
    6: "代理占成变动通知",
    7: "代理返水变动通知",
  };

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={Math.random()}>
            <TableCell>
              <Time time={Number(item.startTime)} />
            </TableCell>
            <TableCell>
              <Time time={Number(item.endTime)} />
            </TableCell>
            <TableCell>
              <Time time={Number(item.createTime)} />
            </TableCell>
            <TruncatedCell
              className="w-[550px]"
              type={item.type}
              content={item.contentOfLanguage}
              maxLength={50}
            />
            <TableCell>{noticeTypeMap[item.type]}</TableCell>
            <TableCell className="text-center">
              <EditBtn data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-40 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
