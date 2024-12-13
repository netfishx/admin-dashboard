"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ModalPagination({
  total,
  currentPage,
  size,
  setPage,
  setSize,
}: {
  total: number;
  currentPage: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}) {
  const t = useTranslations("pagination");

  const totalPage = Math.ceil(total / size);

  const handleChangeSize = (size: number) => {
    setSize(size);
    setPage(1);
  };
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <span className="text-sm">{t("total", { total })}</span>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setPage(1)}
            className="px-1"
          >
            <ChevronFirst className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="px-1"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <span className="px-2 text-sm">{currentPage}</span>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={currentPage === totalPage}
            onClick={() => setPage(currentPage + 1)}
            className="px-1"
          >
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={currentPage === totalPage}
            onClick={() => setPage(totalPage)}
            className="px-1"
          >
            <ChevronLast className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Select
            defaultValue={size?.toString() ?? "10"}
            onValueChange={(value) => handleChangeSize(Number(value))}
          >
            <SelectTrigger className="h-7 w-28 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">{t("perPage", { size: 10 })}</SelectItem>
              <SelectItem value="20">{t("perPage", { size: 20 })}</SelectItem>
              <SelectItem value="50">{t("perPage", { size: 50 })}</SelectItem>
            </SelectContent>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
