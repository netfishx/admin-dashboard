"use client";
import { editMaintain } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const t = useTranslations();
  const translations = useTranslations("games.maintain");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn([
            "text-sm",
            data.status
              ? "text-primary hover:text-primary/80"
              : "text-destructive hover:text-destructive/80",
          ])}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {translations("title", {
              status: translations(data.status === 1 ? "close" : "open"),
            })}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
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
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
                    ? "text-destructive bg-destructive/20"
                    : "text-primary bg-primary/20",
                ])}
              >
                {item.status ? t("maintaining") : t("normal")}
              </span>
            </TableCell>
            <TableCell>{item.updateBy}</TableCell>
            <TableCell>
              {format(item.updateTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 text-center">
              <EditButton data={item}>
                {item.status ? t("close") : t("open")}
              </EditButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
