import { getAgents } from "@/api";
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
import type { AgentData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Action from "./action-buttons";
import { AddAgent } from "./add-agent";
import Form from "./form";
import { Modals } from "./modals";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
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
      <div className="p-2 bg-background flex-1 gap-2">
        <div className="pb-2 flex justify-end">
          <AddAgent />
        </div>
        <Suspense fallback={null}>
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <Modals />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const t = await getTranslations("users.agents");
  const search = await searchParams;
  const { data } = await getAgents({
    ...search,
    page: Number(search.page ?? 1),
    size: Number(search.size ?? 10),
  });
  console.info("agent list:", data);
  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-28">{t("upUsername")}</TableHead>
              <TableHead className="min-w-28">{t("deptId")}</TableHead>
              <TableHead className="min-w-60">{t("userId")}</TableHead>
              <TableHead>{t("username")}</TableHead>
              <TableHead className="min-w-20">{t("nickname")}</TableHead>
              <TableHead className="min-w-20">{t("status")}</TableHead>
              <TableHead className="min-w-[550px] text-center sticky right-0 bg-muted">
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <Suspense
            fallback={
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="h-20">
                    <Skeleton className="w-full h-6" />
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          >
            <TableBodyWrapper list={data?.list} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
    </>
  );
}

async function TableBodyWrapper({ list }: { list: AgentData[] | undefined }) {
  const t = await getTranslations("users.agents");
  return (
    <TableBody>
      {list?.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.upUsername}</TableCell>
          <TableCell>{item.deptId}</TableCell>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.nickname}</TableCell>
          <TableCell className="">
            <div
              className={cn(
                "px-2 rounded-sm w-fit",
                item.status === 0 && "text-green bg-green/10",
                item.status === 1 && "text-destructive bg-destructive/10",
                item.status === 2 && "text-orange bg-orange/10",
              )}
            >
              {t(`statusLabel.${item.status}`)}
            </div>
          </TableCell>
          <TableCell className="text-center sticky right-0 bg-background">
            <Action data={item} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
