"use client";
import { editMaintain } from "@/api";
import { Time } from "@/components/time";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { type ReactNode, useTransition } from "react";
import { toast } from "sonner";

function EditButton({
  children,
  data,
}: {
  children: ReactNode;
  data: MaintainGame;
}) {
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
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
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

export function MaintainTableHeader({
  allChecked,
  handleCheckedChange,
}: {
  allChecked: boolean | "indeterminate";
  handleCheckedChange?: (status: boolean) => void;
}) {
  const t = useTranslations("games.maintain");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-10">
          <Checkbox
            checked={allChecked}
            onCheckedChange={handleCheckedChange}
          />
        </TableHead>
        <TableHead className="w-32">{t("name")}</TableHead>
        <TableHead className="w-32 text-center">{t("status")}</TableHead>
        <TableHead className="w-48">{t("lastId")}</TableHead>
        <TableHead className="w-32">{t("lastTime")}</TableHead>
        <TableHead className="w-32 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function MaintainTable({ data }: { data: MaintainGame[] }) {
  const t = useTranslations("games.maintain");
  const translations = useTranslations();
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
    <Table className="table-fixed">
      <MaintainTableHeader
        allChecked={allChecked}
        handleCheckedChange={(status) => {
          setChecked(status ? data.map((item) => item.id) : []);
        }}
      />
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
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
                    "inline-block w-24 rounded-sm p-1",
                    item.status
                      ? "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary",
                  ])}
                >
                  {item.status ? t("maintaining") : t("normal")}
                </span>
              </TableCell>
              <TableCell>{item.updateBy}</TableCell>
              <TableCell>
                <Time time={item.updateTime} />
              </TableCell>
              <TableCell className="text-center">
                <EditButton data={item}>
                  {item.status ? t("close") : t("open")}
                </EditButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-40 text-center">
              {translations("noData")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
