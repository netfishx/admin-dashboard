import { CustomPagination } from "@/components/custom-pagination";
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
import type { MemberReportsRecord, PageData } from "@/lib/types";
import { useTranslations } from "next-intl";

export function List({ data }: { data: PageData<MemberReportsRecord> }) {
  const t = useTranslations("report.member");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("member_id")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("member_type")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("game_category")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("game_name")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bet_count")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bet_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("valid_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("win_loss_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("cashback_amount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("profit_loss_result")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("details")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.map((item) => (
                <TableRow key={item.member_id}>
                  <TableCell className="w-24 text-center">
                    {item.member_id}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.member_type}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.game_category}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.game_name}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.bet_count}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.bet_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.valid_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.win_loss_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.cashback_amount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.profit_loss_result}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
      <div className="pt-2">
        <CustomPagination total={0} currentPage={1} pageSize={10} />
      </div>
      <div className="pt-2 w-2/5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("bet_count")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("bet_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("valid_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("win_loss_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("cashback_amount")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("profit_loss_result")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">
                {data?.list[0].bet_count}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].bet_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].valid_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].win_loss_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].cashback_amount}
              </TableCell>
              <TableCell className="w-24 text-center">
                {data?.list[0].profit_loss_result}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
