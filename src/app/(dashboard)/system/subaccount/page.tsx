import { AddButton } from "@/app/(dashboard)/system/subaccount/add-button";
import { CustomPagination } from "@/components/custom-pagination";
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
      <div className="bg-background flex-1 p-2 flex flex-col gap-2">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("updateTime")}</TableHead>
                <TableHead className="w-24 text-center sticky right-0 bg-muted">
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
                  <TableCell className="w-24 text-center" colSpan={20}>
                    2
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CustomPagination total={0} currentPage={1} pageSize={10} />
      </div>
    </div>
  );
}
