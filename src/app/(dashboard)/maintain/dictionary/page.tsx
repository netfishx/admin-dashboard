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
import { DeleteDialog } from "./delete-dialog";
import { DictSettingModal } from "./dict-setting-modal";
import { Form } from "./form";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Form />
      <div className="flex flex-1 flex-col bg-background p-4 gap-4">
        <div className="flex justify-end">
          <Add />
        </div>
        <Suspense
          fallback={
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <TableHeaderWrapper />
                <TableBodySkeleton />
              </Table>
            </div>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <DictSettingModal />
      <DeleteDialog />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { pageNum = "1", pageSize = "10" } = await searchParams;

  const { data } = await getDictionaryList({
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  console.info(data, pageNum, pageSize);
  return (
    <>
      <div className="rounded-sm border">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <TableBodyWrapper list={data?.list ?? []} />
        </Table>
      </div>
      <div>
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
  const t = await getTranslations("maintain.dictionary");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-32">{t("dictCode")}</TableHead>
        <TableHead className="w-32">{t("dictName")}</TableHead>
        <TableHead className="w-40">{t("remark")}</TableHead>
        <TableHead className="w-40 text-center">{t("action")}</TableHead>
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
            <TableCell className="flex items-center justify-center">
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
