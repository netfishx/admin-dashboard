import { EditNumber } from "@/components/edit-number";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    type: "闲",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "庄",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "和",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "庄对",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "闲对",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">游戏类别</Label>
            <Select defaultValue="1" disabled>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">游戏名称</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐01</SelectItem>
                <SelectItem value="2">百家乐02</SelectItem>
                <SelectItem value="3">百家乐03</SelectItem>
                <SelectItem value="4">百家乐04</SelectItem>
                <SelectItem value="5">百家乐05</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">批量修改</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">赔率</SelectItem>
                <SelectItem value="2">个人单注最低限额</SelectItem>
                <SelectItem value="3">个人单注最高限额</SelectItem>
                <SelectItem value="4">个人单期最高限额</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">修改值</Label>
            <EditNumber />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">同步到同类游戏</Button>
          <Button variant="destructive">恢复默认</Button>
          <Button>保存</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-16">玩法</TableHead>
              <TableHead className="min-w-24">赔率</TableHead>
              <TableHead className="min-w-40">个人单注最低限额</TableHead>
              <TableHead className="min-w-72">
                个人单注最高限额
                <span className="text-destructive">(*不要超过最高限额)</span>
              </TableHead>
              <TableHead className="min-w-72">
                个人单期最高限额
                <span className="text-destructive">(*不要超过最高限额)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.type}>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Input defaultValue={item.odds} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={item.min} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={item.max} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={item.period} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
