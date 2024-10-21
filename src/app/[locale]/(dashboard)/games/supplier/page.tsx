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
import { unstable_noStore as noStore } from "next/cache";
const data = [
  {
    game: "百家乐01",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐02",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐03",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐04",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
  {
    game: "百家乐05",
    video: "https://www.baidu.com",
    replay: "https://www.baidu.com",
    supplierId: "1",
    supplierName: "供应商01",
    quota: 100,
    percent: 10,
  },
];

export default function Page() {
  noStore();
  const t = useTranslations("games.supplier");
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("type")}</Label>
            <Select defaultValue="1" disabled>
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("supplierId")}</Label>
            <Input placeholder={t("placeholder")} />
          </div>
          <Button>{t("search")}</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button>{t("add")}</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("video")}</TableHead>
              <TableHead>{t("replay")}</TableHead>
              <TableHead>{t("supplierId")}</TableHead>
              <TableHead>{t("supplierName")}</TableHead>
              <TableHead>{t("quota")}</TableHead>
              <TableHead>{t("percent")}</TableHead>
              <TableHead className="w-24 text-center">{t("action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.game}>
                <TableCell>{item.game}</TableCell>
                <TableCell>{item.video}</TableCell>
                <TableCell>{item.replay}</TableCell>
                <TableCell>{item.supplierId}</TableCell>
                <TableCell>{item.supplierName}</TableCell>
                <TableCell>{item.quota}</TableCell>
                <TableCell>{item.percent}</TableCell>
                <TableCell className="w-24 text-center">
                  <Button
                    variant="link"
                    className="hover:no-underline hover:text-primary/80"
                  >
                    {t("edit")}
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
