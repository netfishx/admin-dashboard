import { getPermissionList, getRoleList } from "@/api";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "@/app/(dashboard)/system/role/button";
import { RoleDelete } from "@/app/(dashboard)/system/role/delete";
import { RoleDialog } from "@/app/(dashboard)/system/role/dialog";
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
        <TableHead className="sticky right-0 bg-muted text-center p-0">
          <div className="shadow-l h-full px-4 flex justify-center items-center">
            {t("action")}
          </div>
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
  return (
    <>
      <div className="rounded-sm border">
        <Table>
          <RoleTableHeader />
          <TableBody>
            {!res.data?.list || res.data?.list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  {t("noData")}
                </TableCell>
              </TableRow>
            ) : (
              res.data?.list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.roleName}</TableCell>
                  <TableCell>
                    {item.updateTime && <Time time={item.updateTime} />}
                  </TableCell>
                  <TableCell className="sticky right-0 bg-background p-0">
                    <div className="shadow-l py-2 px-4 flex justify-center items-center">
                      <EditButton data={item} />
                      <DeleteButton id={item.id ?? ""} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {!!res.data?.total && (
        <CustomPagination
          total={res.data?.total || 0}
          currentPage={Number(pageNum)}
          pageSize={Number(pageSize)}
        />
      )}
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between bg-background p-4">
        <div className="text-sm font-medium">{t("list")}</div>
        <AddButton />
        <Suspense>
          <RoleDialog permissions={permissions} />
          <RoleDelete />
        </Suspense>
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-background p-4">
        <Suspense
          fallback={
            <div className="rounded-sm border">
              <Table>
                <RoleTableHeader />
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
              </Table>
            </div>
          }
        >
          <RoleTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
