"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ListRestart } from "lucide-react";
import Link from "next/link";

export function Level({
  searchParams,
}: { searchParams: { [key: string]: string | undefined } }) {
  const r = "/reports/agent/baccarat/ratio";
  const parentAgentIds = searchParams.ids ? searchParams.ids.split(",") : [];
  console.info(parentAgentIds);

  return (
    <Breadcrumb className="h-6">
      <BreadcrumbList>
        {parentAgentIds.length > 0 && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={r}>
                <ListRestart className="w-4 h-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {parentAgentIds.map((item, index) => (
          <div className="inline-flex items-center" key={item}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index < parentAgentIds.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={`${r}?${new URLSearchParams({
                      ...searchParams,
                      parentAgentId: item,
                      ids:
                        searchParams.ids
                          ?.split(",")
                          .slice(0, index + 1)
                          .join(",") ?? "",
                    })}`}
                  >
                    {item}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink className="text-foreground">
                  {item}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
