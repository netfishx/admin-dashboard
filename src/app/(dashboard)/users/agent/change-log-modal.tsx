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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
export function ChangeLogModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  const data = [
    {
      id: 1,
      operateTime: "2024-01-01 12:00:00",
      operater: "admin",
      username: "user1",
      ip: "192.168.1.1",
      address: "中国",
      operateType: "修改",
      operateDesc: "修改退水比例",
      status: 2,
    },
  ];
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("changeLog")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>{t("operateTime")}</TableHead>
                <TableHead>{t("operater")}</TableHead>
                <TableHead>{t("username")}</TableHead>
                <TableHead>{t("ip")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("operateType")}</TableHead>
                <TableHead>{t("operateDesc")}</TableHead>
                <TableHead>{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.operateTime}</TableCell>
                  <TableCell>{item.operater}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.ip}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.operateType}</TableCell>
                  <TableCell>{item.operateDesc}</TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "px-2 rounded-sm w-fit",
                        item.status === 1 && "text-primary bg-primary/10",
                        item.status === 2 &&
                          "text-destructive bg-destructive/10",
                      )}
                    >
                      {t(`statusLabel.${item.status}`)}
                    </div>
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
