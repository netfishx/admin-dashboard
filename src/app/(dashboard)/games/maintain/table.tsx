"use client";
import { editMaintain } from "@/api";
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
import type { MaintainGame } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { type ReactNode, useTransition } from "react";
import { toast } from "sonner";

function EditButton({
  children,
  data,
}: { children: ReactNode; data: MaintainGame }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      variant="link"
      className={cn([
        "hover:no-underline",
        data.status
          ? "text-destructive hover:text-destructive/80"
          : "hover:text-primary/80",
      ])}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await editMaintain({
            status: data.status ? 0 : 1,
            ids: [data.id],
          });
          if (res.code === 0) {
            router.refresh();
          } else {
            toast.error(res.message);
          }
        });
      }}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </Button>
  );
}

export function MaintainTable({
  data,
}: {
  data: MaintainGame[];
}) {
  const t = useTranslations("games.maintain");
  const [checked, setChecked] = useQueryState(
    "checked",
    parseAsArrayOf(parseAsString).withDefault([]),
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
          <TableRow key={item.id}>
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
            <TableCell>{item.gameName}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn([
                  "p-1 rounded-sm w-24 inline-block",
                  item.status
                    ? "text-primary bg-primary/20"
                    : "text-destructive bg-destructive/20",
                ])}
              >
                {item.status ? t("normal") : t("maintaining")}
              </span>
            </TableCell>
            <TableCell>{item.updateBy}</TableCell>
            <TableCell>
              {format(item.updateTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 text-center">
              <EditButton data={item}>
                {item.status ? t("open") : t("close")}
              </EditButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
