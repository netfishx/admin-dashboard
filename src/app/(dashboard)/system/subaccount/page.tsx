import { AddButton } from "@/app/(dashboard)/system/subaccount/add-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function SubaccountPage() {
  const t = useTranslations("system.subaccount");
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center bg-background p-4">
        <div className="text-sm font-medium">{t("list")}</div>
        <AddButton />
      </div>
      <div className="bg-background flex-1 p-4">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead className="w-24 text-center">
                  {t("action")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[{}, {}, {}].map((item, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.updateTime}</TableCell> */}
                  <TableCell className="w-24 text-center">2</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
