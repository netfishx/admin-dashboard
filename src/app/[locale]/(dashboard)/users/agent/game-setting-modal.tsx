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
export function GameSettingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("users.agents");
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("gamesSetting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full px-4">123</div>
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
