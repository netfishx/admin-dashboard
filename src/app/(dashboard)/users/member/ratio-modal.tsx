"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ScrollableTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ratioDataAtom, ratioModalAtom } from "@/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export function RatioModal() {
  const translations = useTranslations();
  const t = useTranslations("users.members");

  const [open, setOpen] = useAtom(ratioModalAtom);
  const data = useAtomValue(ratioDataAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="lg:max-w-md 2xl:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("ratioInfo")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t("baccarat")}</span>
          <div className="max-h-[50dvh] overflow-auto rounded-sm border">
            <ScrollableTable className="relative">
              <TableHeader>
                <TableRow className="bg-muted sticky top-0">
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("ratio")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                data?.filter((item) => item.gameType === 61).length > 0 ? (
                  data
                    ?.filter((item) => item.gameType === 61)
                    .map((item) => (
                      <TableRow key={item.gameId}>
                        <TableCell>{item.gameName}</TableCell>
                        <TableCell>{item.percent}%</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-40 text-center">
                      {translations("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </ScrollableTable>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{translations("cancel")}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>{translations("confirm")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
