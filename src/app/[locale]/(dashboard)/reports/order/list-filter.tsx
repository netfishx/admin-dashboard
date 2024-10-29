
'use client'
import React from 'react'

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

import DateRangeFilter from '@/components/daterange-filter';
import AmountFilter from "@/components/amount-filter";
import { useTranslations } from "next-intl";
interface DateRange {
    from: string;
    to: string;
  }

export default function ListFilter() {
    const t = useTranslations("report.orderlist");
    const handleDateRangeChange = (date: DateRange) => {
        console.log(date, 'date');
    }
    const handleFilterChange = (filterType: string, amount: number | null) => {
        console.log(`Filter: ${filterType}, Amount: ${amount}`);
    };
    return (
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
    )
}
