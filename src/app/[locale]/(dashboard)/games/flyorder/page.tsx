import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
    isOpen: true,
  },
  {
    game: "百家乐02",
    isOpen: true,
  },
  {
    game: "百家乐03",
    isOpen: false,
  },
  {
    game: "百家乐04",
    isOpen: true,
  },
  {
    game: "百家乐05",
    isOpen: false,
  },
];

export default function Page() {
  const t = useTranslations("games.flyorder");
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <span className="text-sm font-medium">{t("title")}</span>
        <span>
          <Button>{t("save")}</Button>
        </span>
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("name")}</TableHead>
                <TableHead className="w-32 text-center">
                  {t("switch")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.game}>
                  <TableCell>{item.game}</TableCell>
                  <TableCell className="w-32 text-center">
                    <Switch defaultChecked={item.isOpen} />
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
