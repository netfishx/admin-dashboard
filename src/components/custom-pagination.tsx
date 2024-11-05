"use client";

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
export default function Pages({
  total,
  currentPage,
  pageSize,
}: { total: number; currentPage: number; pageSize: number }) {
  const pathname = usePathname();
  const totalPage = Math.ceil(total / pageSize);
  const t = useTranslations("pagination");
  const router = useRouter();
  const query = useSearchParams();
  const handlePageSizeChange = (size: string) => {
    router.push(
      `${pathname}?${new URLSearchParams({ ...Object.fromEntries(query.entries()), size, page: String(1) }).toString()}`,
    );
  };
  return (
    <>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <span className="text-muted-foreground text-sm">
              {t("total", { total })}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Link
              href={{
                pathname,
                query: { ...Object.fromEntries(query.entries()), page: 1 },
              }}
              className={`w-6 h-4 rounded-full flex items-center justify-center px-1 ${currentPage === 1 ? "cursor-not-allowed text-muted-foreground" : ""}`}
            >
              <ChevronFirst className="size-4" />
            </Link>
          </PaginationItem>
          <PaginationItem>
            {currentPage === 1 ? (
              <div className="w-6 h-4 rounded-full flex items-center justify-center px-1 cursor-not-allowed text-muted-foreground">
                <ChevronLeftIcon className="size-4" />
              </div>
            ) : (
              <PaginationPrevious
                className="px-1"
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    page: currentPage - 1,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <span className="w-6 inline-block text-center text-sm">
              {currentPage}
            </span>
          </PaginationItem>
          <PaginationItem>
            {currentPage === totalPage ? (
              <div className="w-6 h-4 rounded-full flex items-center justify-center px-1 cursor-not-allowed text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </div>
            ) : (
              <PaginationNext
                className="px-1"
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(query.entries()),
                    page: currentPage + 1,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <Link
              href={{
                pathname,
                query: {
                  ...Object.fromEntries(query.entries()),
                  page: totalPage,
                },
              }}
              className={`w-6 h-4 bg-background rounded-full flex items-center justify-center px-1 ${currentPage === totalPage ? "cursor-not-allowed text-muted-foreground" : ""}`}
            >
              <ChevronLast className="size-4" />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(value)}
            >
              <SelectTrigger className="w-28 h-7 text-muted-foreground text-sm">
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
