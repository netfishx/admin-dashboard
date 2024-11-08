"use client";
import { EditNumber } from "@/components/edit-number";
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
import { useTranslations } from "next-intl";
import { useState } from "react";

export function OddsForm({ data }: { data: any[] }) {
  const t = useTranslations("games.odds");
  const [step, setStep] = useState(1);

  function handleEdit(num: number) {}
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("type")}</Label>
            <Select defaultValue="1" disabled>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("name")}</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-36">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">百家乐01</SelectItem>
                <SelectItem value="2">百家乐02</SelectItem>
                <SelectItem value="3">百家乐03</SelectItem>
                <SelectItem value="4">百家乐04</SelectItem>
                <SelectItem value="5">百家乐05</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("batch")}</Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t("odds")}</SelectItem>
                <SelectItem value="2">{t("min")}</SelectItem>
                <SelectItem value="3">{t("max")}</SelectItem>
                <SelectItem value="4">{t("total")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="shrink-0">{t("column")}</Label>
            <EditNumber step={step} setStep={setStep} handleEdit={handleEdit} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{t("sync")}</Button>
          <Button variant="destructive">{t("reset")}</Button>
          <Button>{t("save")}</Button>
        </div>
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-16">{t("smallType")}</TableHead>
                <TableHead className="min-w-24">{t("odds")}</TableHead>
                <TableHead className="min-w-40">{t("min")}</TableHead>
                <TableHead className="min-w-72">
                  {t("max")}
                  <span className="text-destructive">{t("tip")}</span>
                </TableHead>
                <TableHead className="min-w-72">
                  {t("total")}
                  <span className="text-destructive">{t("tip")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.type}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Input defaultValue={item.odds} />
                  </TableCell>
                  <TableCell>
                    <Input defaultValue={item.min} />
                  </TableCell>
                  <TableCell>
                    <Input defaultValue={item.max} />
                  </TableCell>
                  <TableCell>
                    <Input defaultValue={item.period} />
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
