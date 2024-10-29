"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";

export function MaintainTable({
  data,
}: {
  data: {
    game: string;
    status: number;
    id: number;
    time: string;
  }[];
}) {
  const t = useTranslations("games.maintain");
  const [checked, setChecked] = useQueryState(
    "checked",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );
  const allChecked =
    checked.length === data.length
      ? true
      : checked.length > 0
        ? "indeterminate"
        : false;
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>
            <Checkbox
              checked={allChecked}
              onCheckedChange={(status) => {
                status
                  ? setChecked(data.map((item) => item.id))
                  : setChecked([]);
              }}
            />
          </TableHead>
          <TableHead>{t("name")}</TableHead>
          <TableHead className="text-center">{t("status")}</TableHead>
          <TableHead>{t("lastId")}</TableHead>
          <TableHead>{t("lastTime")}</TableHead>
          <TableHead className="w-24 text-center">{t("action")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.game}>
            <TableCell>
              <Checkbox
                checked={checked.includes(item.id)}
                onCheckedChange={(status) => {
                  status
                    ? setChecked([...checked, item.id])
                    : setChecked(checked.filter((id) => id !== item.id));
                }}
              />
            </TableCell>
            <TableCell>{item.game}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn([
                  "p-1 rounded-sm w-24 inline-block",
                  item.status
                    ? "text-destructive bg-destructive/20"
                    : "text-primary bg-primary/20",
                ])}
              >
                {item.status ? t("maintaining") : t("normal")}
              </span>
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell className="w-24 text-center">
              <Button
                variant="link"
                className={cn([
                  "hover:no-underline",
                  item.status
                    ? "hover:text-primary/80"
                    : "text-destructive hover:text-destructive/80",
                ])}
              >
                {item.status ? t("close") : t("open")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
