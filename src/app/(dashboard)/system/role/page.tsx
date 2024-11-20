import { getPermissionList, getRoleList } from "@/api";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "@/app/(dashboard)/system/role/button";
import { RoleDelete } from "@/app/(dashboard)/system/role/delete";
import { RoleDialog } from "@/app/(dashboard)/system/role/dialog";
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
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

function RoleTableHeader() {
  const t = useTranslations("system.role");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("id")}</TableHead>
        <TableHead>{t("name")}</TableHead>
        <TableHead>{t("updateTime")}</TableHead>
        <TableHead>{t("createBy")}</TableHead>
        <TableHead>{t("type")}</TableHead>
        <TableHead className="text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function RoleTableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { pageNum = "1", pageSize = "10" } = await searchParams;
  const res = await getRoleList({
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  const t = await getTranslations();
  const translations = await getTranslations("system.role");
  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <RoleTableHeader />
          <TableBody>
            {!res.data?.list || res.data?.list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32">
                  {t("noData")}
                </TableCell>
              </TableRow>
            ) : (
              res.data?.list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.roleName}</TableCell>
                  <TableCell>
                    {item.updateTime &&
                      format(item.updateTime, "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>{item.createBy}</TableCell>
                  <TableCell>
                    {item.roleType === 0
                      ? translations("systemDefault")
                      : translations("personalCreate")}
                  </TableCell>
                  <TableCell className="text-center sticky right-0 bg-background">
                    <div className="flex justify-center">
                      <EditButton data={item} />
                      <DeleteButton id={Number(item.id)} />
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

export default function RolePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = useTranslations("system.role");
  const permissions = getPermissionList();
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center bg-background p-4">
        <div className="text-sm font-medium">{t("list")}</div>
        <AddButton />
        <Suspense>
          <RoleDialog permissions={permissions} />
          <RoleDelete />
        </Suspense>
      </div>
      <div className="bg-background flex-1 p-2 flex flex-col gap-2">
        <Suspense
          fallback={
            <Table>
              <RoleTableHeader />
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="w-full h-6" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        >
          <RoleTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
