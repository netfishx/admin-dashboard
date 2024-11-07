"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

export function FlyOrderForm({
  data,
}: { data: { game: string; isOpen: boolean }[] }) {
  const translations = useTranslations();
  const t = useTranslations("games.flyorder");
  const [openList, setOpenList] = useState(
    data.filter((item) => item.isOpen).map((item) => item.game),
  );
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center bg-background py-2 px-4">
          <span className="text-sm font-medium">{t("title")}</span>
          <span>
            <Button onClick={() => setOpen(true)}>{t("save")}</Button>
          </span>
        </div>
        <div className="p-2 bg-background flex-1">
          <div className="border rounded-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead className="w-32 text-center">
                    {t("switch")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.game}>
                    <TableCell>{item.game}</TableCell>
                    <TableCell className="w-32 flex justify-center items-center h-10">
                      <Switch
                        defaultChecked={item.isOpen}
                        onCheckedChange={(checked) => {
                          setOpenList(
                            checked
                              ? [...openList, item.game]
                              : openList.filter((game) => game !== item.game),
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmText")}</AlertDialogTitle>
            <AlertDialogDescription>
              {JSON.stringify(openList)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
            <AlertDialogAction>{translations("confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
