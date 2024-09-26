"use client";
import './dataPagination.css';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
import { useState } from "react";

interface DatePaginationProps {
    pageNum?: number;      // 当前页码 (可选)
    pageSize?: number;     // 每页条数 (可选)
    total?: number;        // 总条目数 (可选)
    onPageChange: (page: number, pageSize: number) => void;  // 页码变化的回调函数
}

export function DataPagination({
    pageNum = 1,           // 默认当前页码为 1
    pageSize = 10,         // 默认每页显示 10 条数据
    total = 100,           // 默认总条目数为 100
    onPageChange,
}: DatePaginationProps) {
    const totalPages = Math.ceil(total / pageSize); // 计算总页数
    const [inputPage, setInputPage] = useState(pageNum);  // 用户输入的跳转页
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);  // 当前选择的 pageSize

    // 前后各显示两条的页码范围
    const range = 2;
    const startPage = Math.max(pageNum - range, 1);
    const endPage = Math.min(pageNum + range, totalPages);

    const numbers = Array.from({ length: (endPage - startPage + 1) }, (_, index) => startPage + index);

    // 判断是否为第一页或最后一页，控制链接是否可点击
    const isFirstPage = pageNum === 1;
    const isLastPage = pageNum === totalPages;

    // 更新当前页，并通知父组件
    const handlePageChange = (page: number) => {
        onPageChange(page, currentPageSize);
    };

    // 处理 pageSize 变化
    const handlePageSizeChange = (newSize: number) => {
        setCurrentPageSize(newSize);
        onPageChange(1, newSize); // 重置到第一页并更新 pageSize
    };

    // 处理跳转
    const handleJumpToPage = () => {
        if (inputPage >= 1 && inputPage <= totalPages) {
            handlePageChange(inputPage);
        }
    };

    return (
        <div className="pagination-container">
            <Pagination>
                <PaginationContent className="pagination-buttons">
                    {/* 上一页按钮 */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={!isFirstPage ? () => handlePageChange(pageNum - 1) : undefined}
                            className={isFirstPage ? "disabled" : ""}
                        />
                    </PaginationItem>

                    {/* 页码渲染 */}
                    {numbers.map((item) => (
                        <PaginationItem key={item}>
                            <PaginationLink
                                onClick={() => handlePageChange(item)}
                                isActive={item === pageNum}
                                className={item === pageNum ? "active-page" : ""}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* 如果有更多页，显示省略号 */}
                    {endPage < totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {/* 下一页按钮 */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={!isLastPage ? () => handlePageChange(pageNum + 1) : undefined}
                            className={isLastPage ? "disabled" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
                {/* 跳转到指定页和选择 pageSize，保持在同一行 */}
            <div className="pagination-controls">
                {/* 跳转到指定页 */}
                <div className="pagination-jump">
                    <span>跳转到页码: </span>
                    <Input
                        type="number"
                        value={inputPage}
                        onChange={(e) => setInputPage(parseInt(e.target.value, 10))}
                        min="1"
                        max={totalPages}
                        className="pagination-input"
                    />
                    <Button
                        onClick={handleJumpToPage}
                        disabled={inputPage < 1 || inputPage > totalPages}
                        className="pagination-button"
                    >
                        跳转
                    </Button>
                </div>

                {/* 选择 pageSize */}
                <div className="pagination-select">
                    <span>每页显示条数: </span>
                    <Select
                        value={currentPageSize.toString()}
                        onValueChange={(value) => handlePageSizeChange(Number(value))}
                    >
                        <SelectTrigger className="pagination-select-trigger">
                            <SelectValue placeholder="选择每页显示条数" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            </Pagination>
        </div>
    );
}