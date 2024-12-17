import { getAnnouncement } from "@/api";
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
import { NOTICE_TYPE } from "@/lib/dict";
import type { PageData } from "@/lib/types";
import type { AnnouncementList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { TruncatedCell } from "../truncated-cell";

export async function List({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { startTime, endTime, userId, pageNum, pageSize } = await searchParams;
  if (!(startTime && endTime)) {
    return (
      <Table className="rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const { data } = await getAnnouncement({
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    startLastTime: Number(startTime),
    endLastTime: Number(endTime),
    userId,
  });

  return (
    <div>
      <div className="rounded-sm border">
        <Table>
          <TableHeaderWrapper />
          <TableBodyWrapper data={data} />
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
export async function TableHeaderWrapper() {
  const t = await getTranslations("system.announcement");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        {/* admin permission */}
        <TableHead className="w-48">{t("startTime")}</TableHead>

        <TableHead className="w-48">{t("endTime")}</TableHead>

        {/* admin permission */}
        <TableHead className="w-48">{t("createTime")}</TableHead>

        {/* admin permission */}
        <TableHead className="w-32">{t("type")}</TableHead>

        {/* admin permission */}
        <TableHead className="w-32">{t("userId")}</TableHead>

        <TableHead className="w-[450px]">{t("content")}</TableHead>
      </TableRow>
    </TableHeader>
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
          <TableRow key={item.id}>
            {/* admin permission */}
            <TableCell>
              <Time time={Number(item.startTime)} />
            </TableCell>

            <TableCell>
              <Time time={Number(item.endTime)} />
            </TableCell>
            {/* admin permission */}
            <TableCell>
              <Time time={Number(item.createTime)} />
            </TableCell>

            {/* admin permission */}
            <TableCell>
              {(() => {
                const status = NOTICE_TYPE.find((s) => s.value === item.type);
                return status ? t(status.label) : item.type;
              })()}
            </TableCell>

            {/* admin permission */}
            <TableCell>{item.userId}</TableCell>

            <TruncatedCell
              type={item.type}
              content={item.contentOfLanguage}
              maxLength={50}
            />
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center h-40">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={6}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
