import { getDictionaryList } from "@/api";
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
import type { DictionaryList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Add } from "./add";
import { DictSettingModal } from "./dict-setting-modal";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-4 bg-background flex-1">
        <div className="pb-2 flex justify-end">
          <Add />
        </div>
        <Suspense
          fallback={
            <Table className="rounded-sm border">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <DictSettingModal />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { pageNum = "1", pageSize = "10", ...rest } = await searchParams;
  const { data } = await getDictionaryList({
    ...rest,
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  return (
    <>
      <div className="rounded-sm border">
        <Table>
          <TableHeaderWrapper />
          <TableBodyWrapper list={data?.list ?? []} />
        </Table>
      </div>
      <div className="pt-2">
        {data?.total && data?.total > 0 ? (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(pageNum) || 1}
            pageSize={Number(pageSize) || 10}
          />
        ) : null}
      </div>
    </>
  );
}

async function TableHeaderWrapper() {
  "use cache";
  const t = await getTranslations("maintain.dictionary");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("dictCode")}</TableHead>
        <TableHead>{t("dictName")}</TableHead>
        <TableHead>{t("remark")}</TableHead>
        <TableHead className="text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableBodyWrapper({ list }: { list: DictionaryList[] }) {
  const translations = await getTranslations();
  return (
    <TableBody>
      {list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.dictCode}</TableCell>
            <TableCell>{item.dictName}</TableCell>
            <TableCell>{item.remark}</TableCell>
            <TableCell className="text-center">
              <Actions data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="h-40 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={i}>
          <TableCell colSpan={4}>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
