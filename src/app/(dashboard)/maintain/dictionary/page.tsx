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
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton className="h-9 w-full opacity-25" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1">
        <div className="pb-2 flex justify-end">
          <Add />
        </div>
        <Suspense
          fallback={
            <Table className="border rounded-sm">
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
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { pageNum, pageSize } = await searchParams;
  const { data } = await getDictionaryList({
    pageNum: Number(pageNum) || 1,
    pageSize: Number(pageSize) || 10,
  });
  return (
    <>
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodyWrapper list={data?.list ?? []} />
      </Table>
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
        <TableHead>{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableBodyWrapper({ list }: { list: DictionaryList[] }) {
  return (
    <TableBody>
      {list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.dictCode}</TableCell>
            <TableCell>{item.dictName}</TableCell>
            <TableCell>{item.remark}</TableCell>
            <TableCell>
              <Actions data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            暂无数据
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
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
