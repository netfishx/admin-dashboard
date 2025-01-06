"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
  onChange,
}: {
  total: number;
  onChange: (page: { pageNum: number; pageSize: number }) => void;
}) {
  const t = useTranslations("pagination");
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(total / size);

  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <span className="text-sm">{t("total", { total })}</span>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === 1}
            onClick={() => {
              setPage(1);
              onChange({ pageNum: 1, pageSize: size });
            }}
            className="px-1"
          >
            <ChevronFirst className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              onChange({ pageNum: page - 1, pageSize: size });
            }}
            className="px-1"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <span className="px-2 text-sm">{page}</span>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === totalPage}
            onClick={() => {
              setPage(page + 1);
              onChange({ pageNum: page + 1, pageSize: size });
            }}
            className="px-1"
          >
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === totalPage}
            onClick={() => {
              setPage(totalPage);
              onChange({ pageNum: totalPage, pageSize: size });
            }}
            className="px-1"
          >
            <ChevronLast className="size-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Select
            defaultValue="10"
            onValueChange={(value) => {
              setSize(Number(value));
              onChange({ pageNum: 1, pageSize: Number(value) });
            }}
          >
            <SelectTrigger className="h-7 w-28 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">{t("perPage", { size: 10 })}</SelectItem>
              <SelectItem value="20">{t("perPage", { size: 20 })}</SelectItem>
              <SelectItem value="50">{t("perPage", { size: 50 })}</SelectItem>
              <SelectItem value="100">{t("perPage", { size: 100 })}</SelectItem>
            </SelectContent>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
