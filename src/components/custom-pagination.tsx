"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function CustomPagination({
  total,
  currentPage,
  pageSize,
}: {
  total: number;
  currentPage: number;
  pageSize: number;
}) {
  const pathname = usePathname();
  const totalPage = Math.ceil(total / pageSize);
  const t = useTranslations("pagination");
  const router = useRouter();
  const query = useSearchParams();
  const handlePageSizeChange = (pageSize: string) => {
    router.push(
      `${pathname}?${new URLSearchParams({ ...Object.fromEntries(query.entries()), pageSize, pageNum: String(1) }).toString()}`,
    );
  };
  return (
    <>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <span className="text-sm text-muted-foreground">
              {t("total", { total })}
            </span>
          </PaginationItem>
          <PaginationItem>
            {currentPage === 1 ? (
              <div
                className={cn(
                  "pointer-events-none flex w-6 items-center justify-center px-1 text-muted-foreground opacity-50",
                )}
              >
                <ChevronFirst className="size-4" />
              </div>
            ) : (
              <Link
                href={{
                  pathname,
                  query: { ...Object.fromEntries(query.entries()), pageNum: 1 },
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "flex w-6 items-center justify-center px-1",
                )}
              >
                <ChevronFirst className="size-4" />
              </Link>
            )}
          </PaginationItem>
          <PaginationItem>
            {currentPage === 1 ? (
              <div
                className={cn(
                  "pointer-events-none flex w-6 items-center justify-center px-1 text-muted-foreground opacity-50",
                )}
              >
                <ChevronLeftIcon className="size-4" />
              </div>
            ) : (
              <PaginationPrevious
                className="px-1"
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    pageNum: currentPage - 1,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <span className="inline-block w-6 text-center text-sm">
              {currentPage}
            </span>
          </PaginationItem>
          <PaginationItem>
            {currentPage === totalPage ? (
              <div
                className={cn(
                  "pointer-events-none flex w-6 items-center justify-center px-1 text-muted-foreground opacity-50",
                )}
              >
                <ChevronRightIcon className="size-4" />
              </div>
            ) : (
              <PaginationNext
                className="px-1"
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    pageNum: currentPage + 1,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem>
            {currentPage === totalPage ? (
              <div
                className={cn(
                  "pointer-events-none flex w-6 items-center justify-center px-1 text-muted-foreground opacity-50",
                )}
              >
                <ChevronLast className="size-4" />
              </div>
            ) : (
              <Link
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    pageNum: totalPage,
                  },
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "flex w-6 items-center justify-center px-1",
                )}
              >
                <ChevronLast className="size-4" />
              </Link>
            )}
          </PaginationItem>
          <PaginationItem>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(value)}
            >
              <SelectTrigger className="h-7 w-28 text-sm text-muted-foreground">
                <SelectValue
                  defaultValue={pageSize ?? 10}
                  placeholder={t("pageSize")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">{t("perPage", { size: 10 })}</SelectItem>
                <SelectItem value="20">{t("perPage", { size: 20 })}</SelectItem>
                <SelectItem value="50">{t("perPage", { size: 50 })}</SelectItem>
                <SelectItem value="100">
                  {t("perPage", { size: 100 })}
                </SelectItem>
              </SelectContent>
            </Select>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
