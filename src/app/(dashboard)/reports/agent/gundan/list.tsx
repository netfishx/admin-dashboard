import Pages from "@/components/custom-pagination";
import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

const tempData = "111111111111111111112221";
const data = [
  {
    ordernumber: "123",
    gameName: "百家乐",
    roomType: "大厅",
    issueNumber: "123",
    playerNumber: "123",
  },
];

export function List() {
  const t = useTranslations("report.orderlist");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">代理ID</TableHead>
                <TableHead className="min-w-24 text-center">游戏名称</TableHead>
                <TableHead className="min-w-24 text-center">房间类型</TableHead>
                <TableHead className="min-w-24 text-center">期数</TableHead>
                <TableHead className="min-w-24 text-center">人数</TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  详情
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.ordernumber}>
                  <TableCell className="w-24 text-center">
                    {item.ordernumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.roomType}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.issueNumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.playerNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <Pages total={0} currentPage={1} pageSize={10} />
      </div>
    </div>
  );
}
