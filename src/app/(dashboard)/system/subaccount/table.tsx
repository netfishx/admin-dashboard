"use client";

import {
  DeleteButton,
  EditButton,
  LoginLogButton,
} from "@/app/(dashboard)/system/subaccount/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Role, Subaccount } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

export function SubaccountTableBody({
  list,
  roles,
}: { list: Subaccount[]; roles: Role[] }) {
  const t = useTranslations();
  const translations = useTranslations("system.subaccount");
  return (
    <TableBody>
      {list.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="text-center h-32">
            {t("noData")}
          </TableCell>
        </TableRow>
      ) : (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">{item.username}</TableCell>
            <TableCell className="text-start break-all">
              {item.roleList
                ?.map((id) => roles.find((role) => role.id === id)?.roleName)
                .join("，")}
            </TableCell>
            <TableCell className="text-center">
              {item.createTime &&
                format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center">{item.lastLoginIp}</TableCell>
            <TableCell className="text-center">
              {!!item.lastLoginTime &&
                format(item.lastLoginTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center">
              <span
                className={cn([
                  "p-1 rounded-sm w-16 inline-block text-center",
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
            <TableCell className="text-center sticky right-0 bg-background">
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
  );
}
