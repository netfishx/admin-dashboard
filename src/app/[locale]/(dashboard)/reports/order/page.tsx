'use client'

import DateRange from './DateRangeFilter';
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import DateRangeFilter from "./DateRangeFilter";
import AmountFilter from "./AmountFilter";
const tempData = "111111111111111111111"
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

interface DateRange {
  from: string;
  to: string;
}



export default function Page() {
  const t = useTranslations("report.orderlist");
  const handleDateRangeChange = (date: DateRange) => {
    console.log(date, 'date');
  }
  const handleFilterChange = (filterType: string, amount: number | null) => {
    console.log(`Filter: ${filterType}, Amount: ${amount}`);
  };

  const CustomTableHeader = (text: string) => {
    return (
      <TableHead className="w-24 min-w-24 text-center">{text}</TableHead>
    )
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 筛选条件 */}
      <div className="flex flex-col gap-2 bg-background py-2 px-4">
        {/* 第一行 */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("gametype")}</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("gamename")}</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Select>
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("bettingtime")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DateRangeFilter onChange={handleDateRangeChange as any} />
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("settlementstatus")}</Label>
            <Select>
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t("placeholderselect")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("ordernumber")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
        </div>
        {/* 第二行 */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("issuenumber")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("ministerID")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("memberID")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("roomeownerID")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("amountfilter")}</Label>
            <AmountFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("leastlevelID")}</Label>
            <Input placeholder={t("placeholderinput")} />
          </div>
          <div className="flex gap-2 items-center">
            <Button>{t("search")}</Button>
          </div>
        </div>
      </div>
      
      {/* 表格 */}
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
                        <Button
                          variant="link"
                          className="hover:no-underline hover:text-primary/80"
                        >
                          {t("more")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
      </div>
    </div>
  );
}
