import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
export function RebateModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent className="2xl:max-w-xl lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("rebateSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>rebate</div>
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
