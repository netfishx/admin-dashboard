'use client';

import React, { useState } from 'react'
import { DataTable } from "@/app/[locale]/pagination/dataTable";
import { DataPagination } from "@/app/[locale]/pagination/dataPagination";
import { flatInvoices, treeInvoices } from './sampleData';

const columns = [
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      fixed: 'left',
      width: '120px',
      sorter: (a, b) => a.invoice.localeCompare(b.invoice),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '150px',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: '150px',
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: '150px',
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
    },
    {
      title: 'Payment Info',
      key: 'paymentInfo',
      children: [
        {
          title: 'Method',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
          width: '150px',
        },
        {
          title: 'Due Date',
          dataIndex: 'dueDate',
          key: 'dueDate',
          width: '150px',
        },
      ],
    },
    {
      title: 'Financials',
      key: 'financials',
      children: [
        {
          title: 'Tax',
          dataIndex: 'tax',
          key: 'tax',
          width: '100px',
        },
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
          width: '100px',
        },
        {
          title: 'Total Amount',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          fixed: 'right',
          width: '150px',
          sorter: (a, b) =>
            parseFloat(a.totalAmount.replace(/[\$,]/g, '')) -
            parseFloat(b.totalAmount.replace(/[\$,]/g, '')),
        },
      ],
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      width: '150px',
    },
    {
      title: 'Extra Info',
      key: 'extraInfo',
      children: [
        {
          title: 'Extra1',
          dataIndex: 'extra1',
          key: 'extra1',
          width: '150px',
        },
        {
          title: 'Extra2',
          dataIndex: 'extra2',
          key: 'extra2',
          width: '150px',
        },
        {
          title: 'Extra3',
          dataIndex: 'extra3',
          key: 'extra3',
          width: '150px',
        },
      ],
    },
  ];
  
  
  
  
  // 可展开配置
  const expandable = {
    expandedRowRender: (record) => <div>这里是 {record.invoice} 的详细信息</div>,
    rowExpandable: () => true,
  };


export default  function pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);  // 当前页码
    const pageSize = 5;
  
    const handlePageChange = (page: number, size: number) => {
      setCurrentPage(page);
      // 处理 pageSize 变化，如果需要
    };
  
    return (
        <div>
            <DataTable
                columns={columns}
                dataSource={treeInvoices} // 使用树形数据
                rowKey="invoice"
                dataType="tree" // 指定数据类型为 'tree'
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: treeInvoices.length,
                    onChange: handlePageChange,
                }}
                expandable={expandable}
                indentSize={12} // 可根据需要调整缩进大小
            />
            <DataTable
                columns={columns}
                dataSource={flatInvoices} // 使用扁平化数据
                rowKey="invoice"
                dataType="flat" // 指定数据类型为 'flat'
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: flatInvoices.length,
                    onChange: handlePageChange,
                }}
                expandable={expandable}
                indentSize={8} // 可根据需要调整缩进大小
            />

            {/* <DataPagination
                pageNum={pageNum}  // 可以传递，也可以不传，默认值为 1
                onPageChange={handlePageChange}
            /> */}
        </div>
    );
  }