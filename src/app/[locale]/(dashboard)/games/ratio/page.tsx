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
    game: "百家乐01",
    value: 1,
  },
  {
    game: "百家乐02",
    value: 1,
  },
  {
    game: "百家乐03",
    value: 1,
  },
  {
    game: "百家乐04",
    value: 1,
  },
  {
    game: "百家乐05",
    value: 1,
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
              <SelectTrigger className="w-28">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">修改值</Label>
            <div className="flex">
              <Button
                variant="ghost"
                className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
              >
                -
              </Button>
              <Input className="rounded-none w-12" defaultValue={1} />
              <Button
                variant="ghost"
                className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive">恢复默认</Button>
          <Button>保存</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>游戏名称</TableHead>
              <TableHead className="min-w-32 w-1/2">
                占成比例
                <span className="text-destructive">(*不要超过最高比例)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.game}>
                <TableCell>{item.game}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Input defaultValue={item.value} />
                  <span className="text-destructive">(40%)</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
