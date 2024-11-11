import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function SystemResourcePage() {
  const t = useTranslations("system.resource");
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-sm font-medium bg-background p-4">{t("title")}</div>
      <div className="flex-1 bg-background p-2">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("code")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>123</TableCell>
                <TableCell>123</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
