import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const data = [
  {
    game: "百家乐01",
    status: 1,
    id: 1,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐02",
    status: 1,
    id: 2,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐03",
    status: 0,
    id: 3,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐04",
    status: 1,
    id: 4,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐05",
    status: 1,
    id: 5,
    time: "2024-01-01 00:00:00",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center bg-background py-2 px-4">
        <div className="flex gap-2">
          <Button variant="destructive">批量开启维护</Button>
          <Button>批量结束维护</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>游戏名称</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead>最后操作ID</TableHead>
              <TableHead>最后操作时间</TableHead>
              <TableHead className="w-24 text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.game}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.game}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn([
                      "p-1 rounded-sm w-24 inline-block",
                      item.status
                        ? "text-destructive bg-destructive/20"
                        : "text-primary bg-primary/20",
                    ])}
                  >
                    {item.status ? "维护中" : "正常开启"}
                  </span>
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell className="w-24 text-center">
                  <Button
                    variant="link"
                    className={cn([
                      "hover:no-underline",
                      item.status
                        ? "hover:text-primary/80"
                        : "text-destructive hover:text-destructive/80",
                    ])}
                  >
                    {item.status ? "结束维护" : "开启维护"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
