import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 更新并扩展数据，以增加表格宽度
const invoices = [
  {
    invoice: "INV001",
    date: "2023-10-01",
    customer: "客户A",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    dueDate: "2023-11-01",
    tax: "$25.00",
    discount: "$10.00",
    notes: "无",
    extra1: "额外信息1",
    extra2: "额外信息2",
    extra3: "额外信息3",
  },
  // ... 其他数据项
]

export function DataTable() {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1000px] border-collapse">
        <TableCaption>您的近期发票列表。</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 z-10 bg-white w-[120px] border-b">
              Invoice
            </TableHead>
            <TableHead className="border-b w-[150px]">Date</TableHead>
            <TableHead className="border-b w-[150px]">Customer</TableHead>
            <TableHead className="border-b w-[150px]">Status</TableHead>
            <TableHead className="border-b w-[150px]">Method</TableHead>
            <TableHead className="border-b w-[150px]">Due Date</TableHead>
            <TableHead className="border-b w-[100px]">Tax</TableHead>
            <TableHead className="border-b w-[100px]">Discount</TableHead>
            <TableHead className="border-b w-[150px]">Extra1</TableHead>
            <TableHead className="border-b w-[150px]">Extra2</TableHead>
            <TableHead className="border-b w-[150px]">Extra3</TableHead>
            <TableHead className="sticky right-0 z-10 bg-white w-[150px] border-b text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="sticky left-0 z-10 bg-white font-medium w-[120px] border-b">
                {invoice.invoice}
              </TableCell>
              <TableCell className="border-b w-[150px]">{invoice.date}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.customer}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.paymentStatus}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.paymentMethod}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.dueDate}</TableCell>
              <TableCell className="border-b w-[100px]">{invoice.tax}</TableCell>
              <TableCell className="border-b w-[100px]">{invoice.discount}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.extra1}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.extra2}</TableCell>
              <TableCell className="border-b w-[150px]">{invoice.extra3}</TableCell>
              <TableCell className="sticky right-0 z-10 bg-white w-[150px] border-b text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              className="sticky left-0 z-10 bg-white font-medium w-[120px] border-b"
              colSpan={1}
            >
              Total
            </TableCell>
            <TableCell className="border-b" colSpan={10}></TableCell>
            <TableCell className="sticky right-0 z-10 bg-white w-[150px] border-b text-right">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
