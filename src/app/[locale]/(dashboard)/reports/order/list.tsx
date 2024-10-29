import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DetailButton from './detail-button';
import { useTranslations } from "next-intl";

const tempData = "111111111111111111112221"
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
  const CustomTableHeader = (text: string) => {
    return (
        <TableHead className="w-24 min-w-24 text-center">{text}</TableHead>
    )
  }
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border h-full rounded-sm relative">
        <ScrollArea className="h-full w-[calc(100dvw-16.1rem)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                {CustomTableHeader(t("ordernumber"))}
                {CustomTableHeader(t("issuenumber"))}
                {CustomTableHeader(t("memberID"))}
                {CustomTableHeader(t("roomeownerID"))}
                {CustomTableHeader(t("ministerID"))}
                {CustomTableHeader(t("leastlevelID"))}
                {CustomTableHeader(t("gamename"))}
                {CustomTableHeader(t("smallType"))}
                {CustomTableHeader(t("odds"))}
                {CustomTableHeader(t("betcontent"))}
                {CustomTableHeader(t("result"))}
                {CustomTableHeader(t("betamount"))}
                {CustomTableHeader(t("winamount"))}
                {CustomTableHeader(t("bettime"))}
                {CustomTableHeader(t("drawtime"))}
                {CustomTableHeader(t("membersettlementtime"))}
                {CustomTableHeader(t("proxysettlementtime"))}
                {CustomTableHeader(t("proxystatus"))}
                <TableHead className="w-24 text-center sticky right-0">
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
                  <TableCell className="w-24 text-center">
                    <DetailButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
