import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

export function LimitModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  const data = [
    {
      name: "百家乐",
      min: 100,
      max: 100000,
      period: 1000000,
    },
  ];
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("limitSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="">{t("name")}</TableHead>
                <TableHead className="">{t("min")}</TableHead>
                <TableHead className="">{t("max")}</TableHead>
                <TableHead className="">{t("total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.min}
                      className="inline-block max-w-32 min-w-28"
                    />
                    <span className="text-destructive">({item.min})</span>
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.max}
                      className="inline-block max-w-32 min-w-28"
                    />
                    <span className="text-destructive">({item.max})</span>
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.period}
                      className="inline-block max-w-32 min-w-28"
                    />
                    <span className="text-destructive">({item.period})</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("close")}
          </Button>
          <Button>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
