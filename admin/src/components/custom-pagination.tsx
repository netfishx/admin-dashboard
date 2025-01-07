"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { Link } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";

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
  const router = useTransitionRouter();
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
            <Button variant="ghost" className="p-0 text-sm" disabled>
              {t("total", { total })}
            </Button>
          </PaginationItem>
          <PaginationItem>
            {currentPage === 1 ? (
              <Button variant="ghost" size="icon" className="w-7" disabled>
                <ChevronFirst className="size-4" />
              </Button>
            ) : (
              <Link
                href={{
                  pathname,
                  query: { ...Object.fromEntries(query.entries()), pageNum: 1 },
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-7",
                )}
              >
                <ChevronFirst className="size-4" />
              </Link>
            )}
          </PaginationItem>
          <PaginationItem>
            {currentPage === 1 ? (
              <Button variant="ghost" size="icon" className="w-7" disabled>
                <ChevronLeft className="size-4" />
              </Button>
            ) : (
              <Link
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    pageNum: currentPage - 1,
                  },
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-7",
                )}
              >
                <ChevronLeft className="size-4" />
              </Link>
            )}
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="w-7 disabled:opacity-80"
              disabled
            >
              {currentPage}
            </Button>
          </PaginationItem>
          <PaginationItem>
            {currentPage === totalPage ? (
              <Button variant="ghost" size="icon" className="w-7" disabled>
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Link
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    pageNum: currentPage + 1,
                  },
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-7",
                )}
              >
                <ChevronRight className="size-4" />
              </Link>
            )}
          </PaginationItem>
          <PaginationItem>
            {currentPage === totalPage ? (
              <Button variant="ghost" size="icon" className="w-7" disabled>
                <ChevronLast className="size-4" />
              </Button>
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
                  "w-7",
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
              <SelectTrigger className="text-muted-foreground h-7 w-28 text-sm">
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
