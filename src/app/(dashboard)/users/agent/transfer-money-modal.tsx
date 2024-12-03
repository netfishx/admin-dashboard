import { getUserBasicInfo, transferMoney } from "@/api";
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
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import { agentDataAtom, transferMoneyModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function TransferMoneyModal() {
  const router = useRouter();
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [amount, setAmount] = useState(0);
  const [moneyPassword, setMoneyPassword] = useState("");
  const [isPeding, startTransition] = useTransition();
  const [open, setOpen] = useAtom(transferMoneyModalAtom);
  const [fetching, startFetching] = useTransition();
  const data = useAtomValue(agentDataAtom);
  const [availableAmount, setAvailableAmount] = useState(0);

  const handleClickTransferMoney = () => {
    startTransition(async () => {
      if (!data?.id) {
        return;
      }
      const { code, message } = await transferMoney({
        userId: data.id,
        amount,
        secret: moneyPassword,
      });
      if (code === 0) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
    setOpen(false);
    router.refresh();
  };

  useEffect(() => {
    if (open) {
      startFetching(async () => {
        const { code, data, message } = await getUserBasicInfo();
        if (code === 0) {
          setAvailableAmount(data?.usableBalanceMoney || 0);
        } else {
          toast.error(message);
        }
      });
    }
  }, [open, setAvailableAmount]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="2xl:max-w-lg lg:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("transferMoney")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("username")}
            </Label>
            <span>{data?.username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("amount")}
            </Label>
            <Input
              className="w-[200px]"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground" />
            <div className="flex-1 text-xs text-destructive flex flex-row">
              {t("availableAmount")}:
              {fetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                availableAmount
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("moneyPassword")}
            </Label>
            <Password
              value={moneyPassword}
              type="password"
              onChange={(e) => setMoneyPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button disabled={isPeding} onClick={handleClickTransferMoney}>
            {isPeding && <Loader2 className="w-4 h-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
