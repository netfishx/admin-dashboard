import { getBackgroundImageList } from "@/api";
import OneImage from "@/assets/images/demo.jpg";
import { CustomPagination } from "@/components/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BackgroundImageList } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Add } from "./add";
import { AddOrEditDialog } from "./dialog";

export default async function ResourcePage({
  searchParams,
}: {
  searchParams: Promise<{ pageNum: number; pageSize: number }>;
}) {
  const t = await getTranslations("maintain.resource");
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center bg-background p-4">
        <div className="text-sm font-medium">{t("title")}</div>
        <Add />
      </div>
      <div className="bg-background flex-1 p-2 flex flex-col gap-2">
        <Suspense
          fallback={
            <div className="border rounded-sm">
              <Table>
                <TableHeaderWrapper />
                <TableBodySkeleton />
              </Table>
            </div>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <AddOrEditDialog />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ pageNum: number; pageSize: number }>;
}) {
  const { pageNum = 1, pageSize = 10 } = await searchParams;
  const { data } = await getBackgroundImageList({ pageNum, pageSize });
  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <TableHeaderWrapper />
          <TableBodyWrapper list={data?.list ?? []} />
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination total={100} currentPage={1} pageSize={10} />
      </div>
    </>
  );
}

async function TableBodyWrapper({
  list,
}: { list: BackgroundImageList[] | [] }) {
  const translations = await getTranslations();
  const t = await getTranslations("maintain.resource");
  return (
    <TableBody>
      {list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.pictureName}</TableCell>
            <TableCell>
              <Image
                src={OneImage}
                alt={item.pictureName}
                width={20}
                height={20}
              />
            </TableCell>
            <TableCell>{item.port}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.language}</TableCell>
            <TableCell>{item.sort}</TableCell>
            <TableCell>{item.updateTime}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn([
                  "p-1 rounded-sm w-24 inline-block text-center",
                  item.status === 0
                    ? "text-green bg-green/20"
                    : "text-destructive bg-destructive/20",
                ])}
              >
                {item.status === 0 ? t("enable") : t("disable")}
              </span>
            </TableCell>
            <TableCell className="w-40 text-center sticky right-0 bg-background">
              <Actions data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow className="text-center">
          <TableCell colSpan={10}>{translations("noData")}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

async function TableHeaderWrapper() {
  const t = await getTranslations("maintain.resource");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("id")}</TableHead>
        <TableHead>{t("pictureName")}</TableHead>
        <TableHead>{t("pictureUri")}</TableHead>
        <TableHead>{t("port")}</TableHead>
        <TableHead>{t("position")}</TableHead>
        <TableHead>{t("language")}</TableHead>
        <TableHead>{t("sort")}</TableHead>
        <TableHead>{t("updateTime")}</TableHead>
        <TableHead>{t("status")}</TableHead>
        <TableHead className="text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={10}>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
