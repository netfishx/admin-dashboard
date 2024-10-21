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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("games.rebate");
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("type")}</Label>
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
            <Label className="shrink-0">{t("column")}</Label>
            <EditNumber />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive">{t("reset")}</Button>
          <Button>{t("save")}</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("name")}</TableHead>
                <TableHead className="min-w-32 w-1/2">
                  {t("rebate")}
                  <span className="text-destructive">{t("tip")}</span>
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
    </div>
  );
}
