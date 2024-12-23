"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { AgentData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { addAgentLoadingAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Action from "./action-buttons";

export function TableBodyWrapper({
  list,
  permissions,
}: {
  list: AgentData[] | undefined;
  permissions: string[] | undefined;
}) {
  const t = useTranslations("users.agents");
  const translations = useTranslations();
  const addAgentLoading = useAtomValue(addAgentLoadingAtom);
  if (addAgentLoading) {
    return <TableBodySkeleton />;
  }
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.id}>
            {permissions?.includes("agent_search") && (
              <>
                <TableCell>{item.upUsername}</TableCell>
                <TableCell>{item.deptId}</TableCell>
              </>
            )}
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell className="break-all">{item.nickname}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn(
                  "rounded-sm p-2",
                  item.status === 0 && "bg-green/10 text-green",
                  item.status === 1 && "bg-destructive/10 text-destructive",
                  item.status === 2 && "bg-orange/10 text-orange",
                )}
              >
                {t(`statusLabel.${item.status}`)}
              </span>
            </TableCell>
            <TableCell className="sticky right-0 bg-background flex justify-center items-center">
              <Action data={item} permissions={permissions ?? []} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="h-40 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={7}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
