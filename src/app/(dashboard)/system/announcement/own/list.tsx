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
import { NOTICE_STATUS, NOTICE_TYPE } from "@/lib/dict";
import type { AnnouncementList, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
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
    <div className="bg-background flex h-full flex-col gap-2 p-2">
      <div className="rounded-sm border">
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
        <TableHead className="w-48 text-center">{t("status")}</TableHead>
        <TableHead className="w-48">{t("type")}</TableHead>
        <TableHead className="bg-muted sticky right-0 w-24 text-center ">
          {t("action")}
        </TableHead>
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
  const t = await getTranslations("system.announcement");

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
            <TableCell className="text-center">
              <div
                className={cn(
                  "inline-block h-6 w-16 rounded-sm leading-6",
                  item.status === 0 && "bg-destructive/10 text-destructive",
                  item.status === 1 && "bg-green/10 text-green",
                )}
              >
                {(() => {
                  const status = NOTICE_STATUS.find(
                    (s) => s.value === item.status,
                  );
                  return status ? t(status.label) : item.status;
                })()}
                {item.status === null && <span>--</span>}
              </div>
            </TableCell>

            <TableCell>
              {(() => {
                const status = NOTICE_TYPE.find((s) => s.value === item.type);
                return status ? t(status.label) : item.type;
              })()}
            </TableCell>
            <TableCell className="bg-background sticky right-0 text-center">
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
