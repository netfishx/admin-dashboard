import { type AgentData, getAgents } from "@/api";
import Pages from "@/components/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <Suspense fallback={null}>
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 gap-2">
        <div className="pb-2">
          <AddAgent />
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-2/3 h-6" />
            </div>
          }
        >
          <AgentTable searchParams={searchParams} />
        </Suspense>
      </div>
      <Modals />
    </div>
  );
}

async function AgentTable({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const t = await getTranslations("users.agents");
  const search = await searchParams;
  const { data } = await getAgents({
    ...search,
    page: search.page ?? 1,
  });
  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-32">{t("upUsername")}</TableHead>
              <TableHead className="min-w-32">{t("deptId")}</TableHead>
              <TableHead className="min-w-32">{t("userId")}</TableHead>
              <TableHead className="min-w-32">{t("username")}</TableHead>
              <TableHead className="min-w-32">{t("nickname")}</TableHead>
              <TableHead className="min-w-32">{t("status")}</TableHead>
              <TableHead className="min-w-[400px] text-center">
                {t("action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.list?.map((item: AgentData) => (
              <TableRow key={item.userId}>
                <TableCell className="min-w-32">{item.upUsername}</TableCell>
                <TableCell className="min-w-32">{item.deptId}</TableCell>
                <TableCell className="min-w-32">{item.userId}</TableCell>
                <TableCell className="min-w-32">{item.username}</TableCell>
                <TableCell className="min-w-32">{item.nickname}</TableCell>
                <TableCell className="min-w-32">
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
                <TableCell className="min-w-[400px] text-center flex gap-2 2xl:gap-6">
                  <Action data={item} />
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
