"use client";
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
import {} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
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
      <Label className="flex items-center justify-end gap-1 min-w-[120px] flex-shrink-0">
        {required && <span className="text-red-500">*</span>}
        <span className="text-gray-600">{label}</span>
      </Label>
      {readOnly ? (
        <div className="flex-1 bg-gray-50 px-3 py-2 rounded-md text-gray-700">
          {value}
        </div>
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

function WithdrawForm() {
  const t = useTranslations("personal.info");
  const translations = useTranslations();
  const [formData, setFormData] = useState({
    availableAmount: "1,000,000.00",
    withdrawAmount: "",
    serviceFee: "0.00",
    walletAddress: "",
    password: "",
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const warningNotes = [t("tips01"), t("tips02")];

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="p-6 space-y-4">
        <FormField
          label={translations("availableAmount")}
          value={formData.availableAmount}
          onChange={handleChange("availableAmount")}
          readOnly
        />

        <div className="space-y-4">
          <FormField
            label={t("withdrawAmount")}
            value={formData.withdrawAmount}
            onChange={handleChange("withdrawAmount")}
            required
            placeholder={t("withdrawAmount")}
          />
          <div className="ml-[140px] text-sm space-y-1">
            <div className="text-red-500">{t("tips03")}:</div>
            {warningNotes.map((note, index) => (
              <div key={note} className="text-red-500 pl-4">
                {`${index + 1}.${note}`}
              </div>
            ))}
          </div>
        </div>

        <FormField
          label={t("serviceFee")}
          value={formData.serviceFee}
          onChange={handleChange("serviceFee")}
          readOnly
        />

        <FormField
          label={t("walletAddress")}
          value={formData.walletAddress}
          onChange={handleChange("walletAddress")}
          required
          placeholder={t("walletAddress")}
        />

        <FormField
          label={t("password")}
          value={formData.password}
          onChange={handleChange("password")}
          required
          type="password"
          placeholder={t("password")}
        />
      </div>
    </div>
  );
}

export function CheckDialog(props: Dialogprops) {
  const { open = true, onOpenChange } = props;
  const t = useTranslations("personal.info");
  const translations = useTranslations();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(2);
    // onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("withdraw")}</DialogTitle>
            </DialogHeader>
            <div className="gap-2 items-center">
              <WithdrawForm />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => handleNext()}>
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
            <div className="max-w-xl w-full mx-auto p-4">
              <div className="text-center text-lg font-bold">
                <Label className="flex items-center gap-1 min-w-[120px] flex-shrink-0 mb-4">
                  {t("google2faCode")}
                </Label>
                <Input placeholder={t("google2faCode")} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => onOpenChange(false)}>{t("verify")}</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
