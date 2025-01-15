"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { agentBaccaratParentAgentIdAtom } from "@/store";
import { useAtom } from "jotai";
import { ListRestart } from "lucide-react";
import Link from "next/link";

export function Level() {
  const r = "/reports/agent/baccarat/ratio";
  const [parentAgentIds, setParentAgentIds] = useAtom(
    agentBaccaratParentAgentIdAtom,
  );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={r} onClick={() => setParentAgentIds([])}>
              <ListRestart className="w-4 h-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {parentAgentIds.map((item, index) => (
          <div className="inline-flex items-center" key={item.parentAgentId}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  onClick={() => {
                    setParentAgentIds(parentAgentIds.splice(0, index + 1));
                  }}
                  href={`${r}?${new URLSearchParams({
                    ...item.searchParams,
                    parentAgentId: item.parentAgentId,
                  })}`}
                >
                  {item.parentAgentId}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
