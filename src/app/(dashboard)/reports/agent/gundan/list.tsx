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
import { useTranslations } from "next-intl";
import DetailButton from "./detail-button";

const data = [
  {
    ordernumber: "123",
    gameName: "百家乐",
    roomType: "大厅",
    issueNumber: "123",
    playerNumber: "123",
  },
];

export function List() {
  const t = useTranslations("report.agent");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("agentID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("gameName")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("roomType")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("issueNumber")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("playerNumber")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  {t("more")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.ordernumber}>
                  <TableCell className="w-24 text-center">
                    {item.ordernumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.roomType}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.issueNumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.playerNumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    <DetailButton />
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
      <div className="pt-2 w-1/3">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="min-w-24 text-center">
                {t("issueNumber")}
              </TableHead>
              <TableHead className="min-w-24 text-center">
                {t("player")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-24 text-center">123</TableCell>
              <TableCell className="w-24 text-center">4456</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
