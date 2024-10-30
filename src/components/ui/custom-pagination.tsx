"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import { Input } from "./input";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Pages({ total, currentPage, pageSize }: { total: number; currentPage: number; pageSize: number }) {
  const pathname = usePathname();
  const totalPage = Math.ceil(total / pageSize);
  const t = useTranslations("pagination");
  const router = useRouter();
  const handlePageSizeChange = (size: number) => {
    router.push(`${pathname}?page=${currentPage}&size=${size}`);
  };
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <span className="text-sm text-muted-foreground">{t("total", { total })}</span>
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-muted-foreground">{t("jumpTo")}</span>
        </PaginationItem>
        <PaginationItem>
          <Input onKeyDown={(e) => {
            if (e.key === "Enter") {
              const input = e.target as HTMLInputElement;
              router.push(`${pathname}?page=${input.value}&size=${pageSize}`);
            }
          }} type="number" className="w-10 h-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min={1} max={totalPage} />
        </PaginationItem>
        <PaginationItem>
          {currentPage === 1 ? <Button variant="ghost" size="icon" disabled className="pr-2.5"><ChevronLeftIcon className="h-4 w-4"/></Button> : <PaginationPrevious href={`${pathname}?page=${currentPage - 1}&size=${pageSize}`} />}
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm">{currentPage}</span>
        </PaginationItem>
        <PaginationItem>
          {currentPage === totalPage ? <Button variant="ghost" size="icon" disabled className="pl-2.5"><ChevronRightIcon className="h-4 w-4"/></Button> : <PaginationNext href={`${pathname}?page=${currentPage + 1}&size=${pageSize}`}/>}
        </PaginationItem>
        <PaginationItem>
          <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
            <SelectTrigger className="w-26 h-7 text-sm text-muted-foreground">
              <SelectValue defaultValue={pageSize ?? 10} placeholder={t("pageSize")} />
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
