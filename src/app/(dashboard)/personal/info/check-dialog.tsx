"use client";
import {
  getWithdrawFeeList,
  postUserInfoWithdraw,
  postUserInfoWithdrawVerify,
} from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import type {
  UserBasicInfo,
  WithdrawFeeList,
  WithdrawFormData,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserBasicInfo;
}
interface FormField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}
function FormField({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  readOnly = false,
}: FormField) {
  return (
    <div className="flex items-center gap-4">
      <Label className="flex min-w-[120px] shrink-0 items-center justify-end gap-1">
        {required && <span className="text-red-500">*</span>}
        <span className="text-gray-600">{label}</span>
      </Label>
      {readOnly ? (
        <div className="flex-1 rounded-md bg-gray-50 px-3 py-2 text-gray-700">
          {value}
        </div>
      ) : label === "资金密码" ? (
        <Password
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("flex-1 bg-gray-50", readOnly && "cursor-not-allowed")}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("flex-1 bg-gray-50", readOnly && "cursor-not-allowed")}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

function WithdrawForm(props: {
  getFormData: (data: WithdrawFormData) => void;
  data: UserBasicInfo;
}) {
  const { getFormData } = props;
  const t = useTranslations("personal.info");
  const translations = useTranslations();
  const [fee, setFee] = useState<WithdrawFeeList>();
  const [formData, setFormData] = useState({
    availableAmount: props?.data?.usableBalanceMoney?.toString(),
    withdrawMoney: "0",
    withdrawFee: "0",
    withdrawWay: "",
    secret: "",
  });

  useEffect(() => {
    getWithdrawFeeList().then((res) => {
      setFee(res.data?.[0]);
    });
  }, []);

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    let newData = { ...formData };

    if (field === "withdrawMoney") {
      const _fee =
        Number(fee?.percentageFee) * Number(value) + Number(fee?.fixedFee);
      newData = { ...newData, withdrawFee: _fee.toFixed(2) };
    }
    newData[field] = value;
    setFormData(newData);
    getFormData(newData);
  };

  const warningNotes = [t("tips01"), t("tips02")];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="space-y-4 p-6">
        <FormField
          label={translations("availableAmount")}
          value={formData.availableAmount}
          onChange={handleChange("availableAmount")}
          readOnly
        />

        <div className="space-y-4">
          <FormField
            label={t("withdrawAmount")}
            value={formData.withdrawMoney}
            onChange={handleChange("withdrawMoney")}
            required
            placeholder={t("withdrawAmount")}
            type="number"
          />
          <div className="ml-[140px] space-y-1 text-sm">
            <div className="text-red-500">{t("tips03")}:</div>
            {warningNotes.map((note, index) => (
              <div key={note} className="pl-4 text-red-500">
                {`${index + 1}.${note}`}
              </div>
            ))}
          </div>
        </div>

        <FormField
          label={t("withdrawFee")}
          value={formData.withdrawFee}
          onChange={handleChange("withdrawFee")}
          readOnly
        />

        <FormField
          label={t("withdrawWay")}
          value={formData.withdrawWay}
          onChange={handleChange("withdrawWay")}
          required
          placeholder={t("withdrawWay")}
        />

        <FormField
          label={t("secret")}
          value={formData.secret}
          onChange={handleChange("secret")}
          required
          type="secret"
          placeholder={t("secret")}
        />
      </div>
    </div>
  );
}

export function CheckDialog(props: Dialogprops) {
  const { open = true, onOpenChange, data } = props;
  const t = useTranslations("personal.info");
  const translations = useTranslations();
  const [isAllow, setIsAllow] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState<WithdrawFormData>({
    availableAmount: "0 ",
    withdrawMoney: "0",
    withdrawFee: "0",
    withdrawWay: "",
    secret: "",
  });
  const [googleCode, setGoogleCode] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    if (Number(formData.withdrawMoney) > Number(formData.availableAmount)) {
      toast.error(t("tips01"));
      return;
    }
    setLoading(true);
    const _res = await postUserInfoWithdraw(formData);
    if (_res.code === 0) {
      if (_res?.data?.check && _res?.data?.validationType === "GOOGLE") {
        setVerifyId(_res?.data?.id);
        setStep(2);
      } else {
        toast.success(_res.message);
        onOpenChange(false);
        router.refresh();
      }
    } else {
      toast.error(_res.message);
    }
    setLoading(false);
  };

  const handleChange = (data: WithdrawFormData) => {
    if (data.secret && data.withdrawWay && data.withdrawMoney) {
      setIsAllow(true);
    } else {
      setIsAllow(false);
    }

    setFormData(data);
  };

  const handleVerify = async () => {
    setLoading(true);
    const _res = await postUserInfoWithdrawVerify({
      id: verifyId,
      code: googleCode,
    });
    if (_res.code === 0) {
      toast.success(_res.message);
      onOpenChange(false);
      router.refresh();
    } else {
      toast.error(_res.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("withdraw")}</DialogTitle>
            </DialogHeader>
            <div className="items-center gap-2">
              <WithdrawForm getFormData={handleChange} data={data} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button
                onClick={() => handleNext()}
                disabled={loading || !isAllow}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {translations("confirm")}
              </Button>
            </DialogFooter>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("google2fa")}</DialogTitle>
            </DialogHeader>
            <div className="mx-auto w-full max-w-xl p-4">
              <div className="text-center text-lg font-bold">
                <Label className="mb-4 flex min-w-[120px] shrink-0 items-center gap-1">
                  {t("google2faCode")}
                </Label>
                <Input
                  placeholder={t("google2faCode")}
                  value={googleCode}
                  onChange={(e) => setGoogleCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => handleVerify()} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("verify")}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
