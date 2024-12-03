import { getUserBasicInfo } from "@/api";
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

export function TransferMoneyModal() {
  const router = useRouter();
  const translation = useTranslations();
  const t = useTranslations("users.agents");
  const [amount, setAmount] = useState(0);
  const [moneyPassword, setMoneyPassword] = useState("");
  const [isPeding, startTransition] = useTransition();
  const [open, setOpen] = useAtom(transferMoneyModalAtom);
  const data = useAtomValue(agentDataAtom);

  const handleClickTransferMoney = () => {
    setOpen(false);
    router.refresh();
  };

  useEffect(() => {
    if (open) {
      getUserBasicInfo();
    }
  }, [open]);
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
            <span>123</span>
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
          <Button
            disabled={isPeding}
            onClick={() => startTransition(handleClickTransferMoney)}
          >
            {isPeding && <Loader2 className="w-4 h-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
