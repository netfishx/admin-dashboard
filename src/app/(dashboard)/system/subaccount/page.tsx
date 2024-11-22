import { getRoleList, getSubaccountList } from "@/api";
import {
  AddButton,
  DeleteButton,
  EditButton,
  LoginLogButton,
} from "@/app/(dashboard)/system/subaccount/button";
import { SubaccountDelete } from "@/app/(dashboard)/system/subaccount/delete";
import { SubaccountDialog } from "@/app/(dashboard)/system/subaccount/dialog";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LoginLogModalWrapper } from "./login-log-modal";

function SubaccountTableHeader() {
  const t = useTranslations("system.subaccount");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="text-center">{t("name")}</TableHead>
        <TableHead className="text-center">{t("role")}</TableHead>
        <TableHead className="text-center">{t("createTime")}</TableHead>
        <TableHead className="text-center">{t("lastLoginIp")}</TableHead>
        <TableHead className="text-center">{t("lastLoginTime")}</TableHead>
        <TableHead className="text-center">{t("status")}</TableHead>
        <TableHead className="w-24 text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function SubaccountTableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { pageNum = "1", pageSize = "10" } = await searchParams;

  const [res, roleRes] = await Promise.all([
    getSubaccountList({
      pageNum: Number(pageNum),
      pageSize: Number(pageSize),
    }),
    getRoleList({
      pageNum: 1,
      pageSize: 1000,
    }),
  ]);
  const roles = roleRes.data?.list || [];
  const t = await getTranslations();
  const translations = await getTranslations("system.subaccount");

  return (
    <>
      <SubaccountDialog roles={roles} />
      <SubaccountDelete />
      <div className="border rounded-sm">
        <Table>
          <SubaccountTableHeader />
          <TableBody>
            {!res.data?.list || res.data?.list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-32">
                  {t("noData")}
                </TableCell>
              </TableRow>
            ) : (
              res.data?.list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.username}</TableCell>
                  <TableCell className="text-start max-w-32 break-all">
                    {item.roleList
                      ?.map(
                        (id) => roles.find((role) => role.id === id)?.roleName,
                      )
                      .join("，")}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.createTime &&
                      format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lastLoginIp}
                  </TableCell>
                  <TableCell className="text-center">
                    {!!item.lastLoginTime &&
                      format(item.lastLoginTime, "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn([
                        "p-1 rounded-sm w-24 inline-block text-center",
                        item.status === 0
                          ? "text-green bg-green/20"
                          : "text-destructive bg-destructive/20",
                      ])}
                    >
                      {item.status === 0
                        ? translations("enable")
                        : translations("disable")}
                    </span>
                  </TableCell>
                  <TableCell className="w-24 text-center sticky right-0 bg-background">
                    <div className="flex justify-center">
                      <EditButton data={item} />
                      <LoginLogButton id={item.id ?? ""} />
                      <DeleteButton id={item.id ?? ""} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        total={res.data?.total || 0}
        currentPage={Number(pageNum)}
        pageSize={Number(pageSize)}
      />
    </>
  );
}

export default function SubaccountPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = useTranslations("system.subaccount");
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center bg-background p-4">
        <div className="text-sm font-medium">{t("list")}</div>
        <AddButton />
      </div>
      <div className="bg-background flex-1 p-2 flex flex-col gap-2">
        <Suspense
          fallback={
            <div className="border rounded-sm">
              <Table>
                <SubaccountTableHeader />
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={index}>
                      <TableCell colSpan={7}>
                        <Skeleton className="w-full h-6" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }
        >
          <SubaccountTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <LoginLogModalWrapper />
    </div>
  );
}
