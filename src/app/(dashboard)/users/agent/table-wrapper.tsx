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
}: { list: AgentData[] | undefined; permissions: string[] | undefined }) {
  const t = useTranslations("users.agents");
  const addAgentLoading = useAtomValue(addAgentLoadingAtom);
  if (addAgentLoading) {
    return <TableBodySkeleton />;
  }
  return (
    <TableBody>
      {list?.map((item) => (
        <TableRow key={item.id}>
          {permissions?.includes("agent_search") && (
            <>
              <TableCell>{item.upUsername}</TableCell>
              <TableCell>{item.deptId}</TableCell>
            </>
          )}
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
            <Action data={item} permissions={permissions ?? []} />
          </TableCell>
        </TableRow>
      ))}
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
