"use client";
import { DeleteButton, EditButton } from "@/app/(dashboard)/system/role/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Role } from "@/lib/types";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

export function RoleTableBody({ list }: { list: Role[] }) {
  const t = useTranslations();
  const translations = useTranslations("system.role");
  return (
    <TableBody>
      {list.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6} className="text-center h-32">
            {t("noData")}
          </TableCell>
        </TableRow>
      ) : (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.roleName}</TableCell>
            <TableCell>
              {item.updateTime &&
                format(item.updateTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell>
              {item.roleType === 0
                ? translations("systemDefault")
                : translations("personalCreate")}
            </TableCell>
            <TableCell className="text-center sticky right-0 bg-background">
              <div className="flex justify-center">
                <EditButton data={item} />
                <DeleteButton id={item.id ?? ""} />
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
