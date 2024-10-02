'use client';

import React, { useState } from 'react'
import { DataTable } from "@/app/[locale]/pagination/dataTable";
import { DataPagination } from "@/app/[locale]/pagination/dataPagination";

export default function pagination() {
    const [pageNum, setPageNum] = useState(1);  // 当前页码

    // 处理页码变化
    const handlePageChange = (newPage: number) => {
        setPageNum(newPage);
        // 在这里可以发起 API 请求获取新页数据
        console.log(`当前页码：${newPage}`);
    };
    return (
    <div>
        <DataTable />
        <DataPagination
                pageNum={pageNum}  // 可以传递，也可以不传，默认值为 1
                onPageChange={handlePageChange}
            />
    </div>
    )
}
