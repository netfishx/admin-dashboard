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

const tempData = "111111111111111111112221";
const data = [
  {
    ordernumber: "123",
    issuenumber: 123,
    memberID: 123,
    roomeownerID: tempData,
    ministerID: tempData,
    leastlevelID: tempData,
    gamename: tempData,
    smallType: tempData,
    odds: tempData,
    betcontent: tempData,
    result: tempData,
    betamount: tempData,
    winamount: tempData,
    bettime: tempData,
    drawtime: tempData,
    membersettlementtime: tempData,
    proxysettlementtime: tempData,
    proxystatus: tempData,
  },
];

export default function List() {
  const t = useTranslations("report.orderlist");
  return (
    <div className="p-2 bg-background flex-1">
      <div className="py-2">注单列表-真人视讯</div>
      <div className="border rounded-sm relative">
        <ListScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("ordernumber")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("issuenumber")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("memberID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("roomeownerID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("ministerID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("leastlevelID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("gamename")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("smallType")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("odds")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("betcontent")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("result")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("betamount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("winamount")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("bettime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("drawtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("membersettlementtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("proxysettlementtime")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("proxystatus")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  {t("action")}
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
                    {item.issuenumber}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberID}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.roomeownerID}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.ministerID}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.leastlevelID}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gamename}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.smallType}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.odds}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.betcontent}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.result}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.winamount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.bettime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.drawtime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.membersettlementtime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.proxysettlementtime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.proxysettlementtime}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.proxystatus}
                  </TableCell>
                  <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
                    <DetailButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>
    </div>
  );
}
