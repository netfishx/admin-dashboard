// CustomTable.tsx
"use client";

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataPagination } from '../dataPagination/dataPagination';

// 定义 Column 接口和相关类型
interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  width?: string;
  fixed?: 'left' | 'right';
  sorter?: (a: T, b: T) => number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  children?: Column<T>[]; // 用于列分组
}

interface SortState {
  columnKey: string;
  order: 'ascend' | 'descend' | null;
}

interface ExpandableConfig<T> {
  expandedRowRender?: (record: T) => React.ReactNode;
  rowExpandable?: (record: T) => boolean;
  expandIcon?: (props: {
    expanded: boolean;
    onExpand: () => void;
    record: T;
  }) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey: string | ((record: T) => string);
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  expandable?: ExpandableConfig<T>;
  indentSize?: number; // 缩进大小
  dataType?: 'flat' | 'tree'; // 新增，指定数据类型
}

// 定义树形数据类型
interface TreeData<T> extends T {
  children?: TreeData<T>[];
}

// DataTableHeader 组件：渲染表格头部
function DataTableHeader<T>({
  columns,
  onSort,
  sortState,
  hasExpandColumn,
}: {
  columns: Column<T>[];
  onSort: (columnKey: string, sorter?: (a: T, b: T) => void) => void;
  sortState: SortState;
  hasExpandColumn: boolean;
}) {
  const headerRows: React.ReactNode[][] = [];

  // 生成表头行
  const generateHeaderRows = (columns: Column<T>[], level: number = 0) => {
    headerRows[level] = headerRows[level] || [];

    // 在每一行的开头添加展开列的空表头单元格
    if (level === 0 && hasExpandColumn) {
      headerRows[level].push(
        <TableHead
          key="expand-column-header"
          rowSpan={getMaxDepth(columns)}
          className="bg-white border-b"
          style={{ width: '40px', minWidth: '40px', maxWidth: '40px' }}
        >
          {/* 展开/收起列的表头单元格，内容为空 */}
        </TableHead>
      );
    }

    columns.forEach((column) => {
      const hasChildren = column.children && column.children.length > 0;
      const colSpan = hasChildren ? getColSpan(column.children!) : 1;
      const rowSpan = hasChildren ? 1 : getMaxDepth(columns) - level;

      const isSorted = sortState.columnKey === column.key;

      headerRows[level].push(
        <TableHead
          key={column.key}
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={`${column.fixed === 'left' ? 'sticky left-0 z-10' : ''} ${
            column.fixed === 'right' ? 'sticky right-0 z-10' : ''
          } bg-white border-b`}
          style={{ width: column.width }}
        >
          <div
            onClick={() => column.sorter && onSort(column.key, column.sorter)}
            style={{
              cursor: column.sorter ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {column.title}
            {column.sorter && (
              <span>
                {isSorted && sortState.order === 'ascend' && ' 🔼'}
                {isSorted && sortState.order === 'descend' && ' 🔽'}
              </span>
            )}
          </div>
        </TableHead>
      );

      if (hasChildren) {
        generateHeaderRows(column.children!, level + 1);
      }
    });
  };

  generateHeaderRows(columns);

  return (
    <TableHeader>
      {headerRows.map((row, index) => (
        <TableRow key={index}>{row}</TableRow>
      ))}
    </TableHeader>
  );
}

// 辅助函数，用于计算列的 colSpan
function getColSpan<T>(columns: Column<T>[]): number {
  return columns.reduce((sum, column) => {
    if (column.children && column.children.length > 0) {
      return sum + getColSpan(column.children);
    }
    return sum + 1;
  }, 0);
}

// 辅助函数，用于获取表头的最大深度
function getMaxDepth<T>(columns: Column<T>[], depth: number = 0): number {
  return columns.reduce((max, column) => {
    if (column.children && column.children.length > 0) {
      const childDepth = getMaxDepth(column.children, depth + 1);
      return Math.max(max, childDepth);
    }
    return Math.max(max, depth + 1);
  }, depth);
}

// DataTableRow 组件，支持树形数据展开
function DataTableRow<T>({
  record,
  columns,
  rowIndex,
  expandable,
  expandedRowKeys,
  onExpand,
  rowKey,
  level = 0,
  indentSize = 20,
}: {
  record: TreeData<T>;
  columns: Column<T>[];
  rowIndex: number;
  expandable?: ExpandableConfig<T>;
  expandedRowKeys: string[];
  onExpand: (record: TreeData<T>) => void;
  rowKey: string | ((record: T) => string);
  level?: number;
  indentSize?: number;
}) {
  const key =
    typeof rowKey === 'function'
      ? rowKey(record)
      : (record[rowKey] as unknown as string);
  const expanded = expandedRowKeys.includes(key);

  const canExpand =
    (record.children && record.children.length > 0) ||
    expandable?.expandedRowRender;

  const expandIcon = canExpand ? (
    <span
      onClick={() => onExpand(record)}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {expanded ? '-' : '+'}
    </span>
  ) : (
    <span style={{ display: 'inline-block', width: '1em' }} />
  );

  // 展开 columns，处理多级表头
  const flattenColumns = (cols: Column<T>[]): Column<T>[] => {
    return cols.reduce((acc, col) => {
      if (col.children && col.children.length > 0) {
        return acc.concat(flattenColumns(col.children));
      }
      return acc.concat(col);
    }, [] as Column<T>[]);
  };

  const flatColumns = flattenColumns(columns);

  return (
    <>
      <TableRow>
        {expandable && (
          <TableCell
            style={{ width: '40px', minWidth: '40px', maxWidth: '40px' }}
          >
            <div style={{ paddingLeft: level * indentSize }}>
              {expandIcon}
            </div>
          </TableCell>
        )}
        {flatColumns.map((col, colIndex) => {
          const content =
            col.render
              ? col.render(
                  record[col.dataIndex as keyof T],
                  record,
                  rowIndex
                )
              : record[col.dataIndex as keyof T] ?? '';

          const isFirstDataColumn = colIndex === 0;

          return (
            <TableCell
              key={col.key}
              className={`${col.fixed === 'left' ? 'sticky left-0 z-10' : ''} ${
                col.fixed === 'right' ? 'sticky right-0 z-10' : ''
              } bg-white border-b`}
              style={{ width: col.width }}
            >
              {isFirstDataColumn ? (
                <div style={{ paddingLeft: level * indentSize }}>
                  {content}
                </div>
              ) : (
                content
              )}
            </TableCell>
          );
        })}
      </TableRow>
      {expanded && record.children && record.children.length > 0 && (
        record.children.map((child, idx) => (
          <DataTableRow
            key={
              typeof rowKey === 'function'
                ? rowKey(child)
                : (child[rowKey] as unknown as string)
            }
            record={child}
            columns={columns}
            rowIndex={idx}
            expandable={expandable}
            expandedRowKeys={expandedRowKeys}
            onExpand={onExpand}
            rowKey={rowKey}
            level={level + 1}
            indentSize={indentSize}
          />
        ))
      )}
      {expanded && expandable?.expandedRowRender && !record.children && (
        <TableRow>
          <TableCell colSpan={flatColumns.length + 1}>
            <div style={{ paddingLeft: (level + 1) * indentSize }}>
              {expandable.expandedRowRender(record)}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// 将扁平数据转换为树形数据
function toTreeData<T>(
  data: TreeData<T>[],
  keyField: string,
  parentField: string
): TreeData<T>[] {
  const tree: TreeData<T>[] = [];
  const childrenOf: { [key: string]: TreeData<T>[] } = {};

  data.forEach((item) => {
    const id = (item as any)[keyField];
    const parentId = (item as any)[parentField];

    childrenOf[id] = childrenOf[id] || [];
    item.children = childrenOf[id];

    if (parentId) {
      childrenOf[parentId] = childrenOf[parentId] || [];
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
}

// CustomTable 组件
export function CustomTable<T>({
  columns,
  dataSource,
  rowKey,
  pagination,
  expandable,
  indentSize = 20,
  dataType = 'flat', // 默认值为 'flat'
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({
    columnKey: '',
    order: null,
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const sortedData = useMemo(() => {
    if (sortState.order && sortState.columnKey) {
      const sorter = columns.find((col) => col.key === sortState.columnKey)?.sorter;
      if (sorter) {
        const sorted = [...dataSource].sort((a, b) =>
          sortState.order === 'ascend' ? sorter(a, b) : sorter(b, a)
        );
        return sorted;
      }
    }
    return dataSource;
  }, [dataSource, sortState, columns]);

  // 根据 dataType 来处理数据
  const treeData = useMemo(() => {
    if (dataType === 'flat') {
      // 使用 toTreeData 函数将扁平数据转换为树形数据
      return toTreeData(sortedData as TreeData<T>[], 'invoice', 'parentInvoice');
    } else {
      // 数据已经是树形结构，直接使用
      return sortedData as TreeData<T>[];
    }
  }, [sortedData, dataType]);

  // 分页处理（保持不变）
  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);

  const paginatedData = useMemo(() => {
    if (pagination) {
      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      return treeData.slice(start, end);
    }
    return treeData;
  }, [treeData, currentPage, pageSize, pagination]);

  const handleSort = (columnKey: string, sorter?: (a: T, b: T) => number) => {
    let order: 'ascend' | 'descend' | null = 'ascend';
    if (sortState.columnKey === columnKey) {
      if (sortState.order === 'ascend') {
        order = 'descend';
      } else if (sortState.order === 'descend') {
        order = null;
      }
    }
    setSortState({ columnKey, order });
  };

  const handleExpand = (record: TreeData<T>) => {
    const key = typeof rowKey === 'function' ? rowKey(record) : (record[rowKey] as unknown as string);
    setExpandedRowKeys((prevKeys) =>
      prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]
    );
  };

  // 分页改变
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    pagination?.onChange(page, size);
  };

  return (
    <div className="overflow-x-auto" style={{ width: '100%' }}>
      <Table
        className="min-w-full border-collapse"
        style={{ tableLayout: 'fixed' }}
      >
        <DataTableHeader
          columns={columns}
          onSort={handleSort}
          sortState={sortState}
          hasExpandColumn={!!expandable}
        />
        <TableBody>
          {paginatedData.map((record, index) => {
            const key =
              typeof rowKey === 'function'
                ? rowKey(record)
                : (record[rowKey] as unknown as string);
            return (
              <DataTableRow
                key={key}
                record={record}
                columns={columns}
                rowIndex={index}
                expandable={expandable}
                expandedRowKeys={expandedRowKeys}
                onExpand={handleExpand}
                rowKey={rowKey}
                indentSize={indentSize}
                level={0}
              />
            );
          })}
        </TableBody>
      </Table>
      {pagination && (
        <DataPagination
          pageNum={currentPage}
          pageSize={pageSize}
          total={dataSource.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}