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

import { useState, useMemo } from "react";
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface DataPaginationProps {
    pageNum?: number;      // 当前页码 (可选)
    pageSize?: number;     // 每页条数 (可选)
    total?: number;        // 总条目数 (可选)
    pageSizeOptions?: Array<string>,
    isShowLatest?: boolean,
    isShowJump?: boolean,
    onPageChange: (page: number, pageSize: number) => void;  // 页码变化的回调函数
}

export function DataPagination({
    pageNum = 1,           // 默认当前页码为 1
    pageSize = 10,         // 默认每页显示 10 条数据
    total = 100,  
    pageSizeOptions = ['5', '10', '15', '20', '50'],
    isShowLatest = false,
    isShowJump = false,
    onPageChange,
}: DataPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    // 从 URL 参数或 props 获取 pageNum 和 pageSize
    const pageNumParam = parseInt(searchParams.get('pageNum') || pageNum.toString(), 10);
    const pageSizeParam = parseInt(searchParams.get('pageSize') || pageSize.toString(), 10);

    const currentPageNum = isNaN(pageNumParam) ? 1 : pageNumParam;
    const currentPageSize = isNaN(pageSizeParam) ? 10 : pageSizeParam;

    const totalPages = Math.max(Math.ceil(total / currentPageSize), 1); // 计算总页数

    const [inputPage, setInputPage] = useState<string>(currentPageNum.toString());  // 用户输入的跳转页

    // 固定显示的页码数量
    const visiblePageCount = 5;
    let startPage = currentPageNum - Math.floor(visiblePageCount / 2);
    let endPage = currentPageNum + Math.floor(visiblePageCount / 2);

    // 调整 startPage 和 endPage，使其在有效范围内
    if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
    }
    if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
    }

    // 确保 startPage 和 endPage 在有效范围内
    startPage = Math.max(startPage, 1);
    endPage = Math.min(endPage, totalPages);

    const numbers = useMemo(() => {
        return Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );
    }, [startPage, endPage]);

    // 判断是否为第一页或最后一页，控制链接是否可点击
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === totalPages;

    // 更新当前页，并通知父组件，同时更新 URL
    const handlePageChange = (page: number) => {
        onPageChange(page, currentPageSize);

        const newQuery = {
            ...paramsObject,
            pageNum: page.toString(),
            pageSize: currentPageSize.toString(),
        };
        const searchString = new URLSearchParams(newQuery).toString();
        router.push(`${pathname}?${searchString}`);
    };

    // 处理 pageSize 变化
    const handlePageSizeChange = (newSize: number) => {
        onPageChange(1, newSize); // 重置到第一页并更新 pageSize

        const newQuery = {
            ...paramsObject,
            pageNum: '1',
            pageSize: newSize.toString(),
        };
        const searchString = new URLSearchParams(newQuery).toString();
        router.push(`${pathname}?${searchString}`);
    };

    // 处理跳转
    const handleJumpToPage = () => {
        const page = parseInt(inputPage, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            handlePageChange(page);
        } else {
            // 可以添加提示，输入无效
        }
    };

    return (
        <div className="pagination-container">
            <Pagination>
                <PaginationContent className="pagination-buttons">
                    <span>共 {total} 条</span>
                    {/* 上一页按钮 */}
                    <PaginationItem>
                        {!isFirstPage ? (
                            <button
                                onClick={() => handlePageChange(currentPageNum - 1)}
                                className="arr"
                                aria-label="上一页"
                            >
                                <PaginationPrevious />
                            </button>
                        ) : (
                            <button className="arr disabled" aria-label="上一页" disabled>
                                <PaginationPrevious />
                            </button>
                        )}
                    </PaginationItem>

                    {/* 页码渲染 */}
                    {numbers.map((item) => (
                        <PaginationItem key={item}>
                            <Link
                                href={{
                                    pathname,
                                    query: { 
                                        ...paramsObject,
                                        pageNum: item.toString(),
                                        pageSize: currentPageSize.toString()
                                    },
                                }}
                                className={item === currentPageNum ? "page active-page" : "page"}
                            >
                                {item}
                            </Link>
                        </PaginationItem>
                    ))}

                    {/* 如果有更多页，显示省略号 */}
                    {endPage < totalPages && isShowLatest && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <Link
                                    href={{
                                        pathname,
                                        query: { 
                                            ...paramsObject,
                                            pageNum: totalPages.toString(),
                                            pageSize: currentPageSize.toString()
                                        },
                                    }}
                                    className="page"
                                >
                                    {totalPages}
                                </Link>
                            </PaginationItem>
                        </>
                    )}

                    {/* 下一页按钮 */}
                    <PaginationItem>
                        {!isLastPage ? (
                            <button
                                onClick={() => handlePageChange(currentPageNum + 1)}
                                className="arr"
                                aria-label="下一页"
                            >
                                <PaginationNext />
                            </button>
                        ) : (
                            <button className="arr disabled" aria-label="下一页" disabled>
                                <PaginationNext />
                            </button>
                        )}
                    </PaginationItem>
                </PaginationContent>
                {/* 跳转到指定页和选择 pageSize，保持在同一行 */}
                <div className="pagination-controls">
                    {/* 跳转到指定页 */}
                    {isShowJump && (
                        <div className="pagination-jump">
                            <Input
                                type="number"
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value)}
                                min="1"
                                max={totalPages.toString()}
                                className="pagination-input"
                            />
                            <Button
                                onClick={handleJumpToPage}
                                disabled={
                                    isNaN(parseInt(inputPage, 10)) ||
                                    parseInt(inputPage, 10) < 1 ||
                                    parseInt(inputPage, 10) > totalPages
                                }
                                className="pagination-button"
                            >
                                跳转
                            </Button>
                        </div>
                    )}

                    {/* 选择 pageSize */}
                    <div className="pagination-select">
                        <Select
                            value={currentPageSize.toString()}
                            onValueChange={(value) => handlePageSizeChange(Number(value))}
                        >
                            <SelectTrigger className="pagination-select-trigger">
                                <SelectValue placeholder="选择每页显示条数" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {pageSizeOptions?.map(item => (
                                        <SelectItem key={item} value={item}>
                                            {item} 条/页
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Pagination>
        </div>
    );
}
