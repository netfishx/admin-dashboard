"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export default function AmountFilter({
  amountText = "betAmount",
  onReset = () => {},
}: { amountText?: string; onReset?: (resetFn: () => void) => void }) {
  const t = useTranslations("report.orderlist");

  const [filterAmount, setFilterAmount] = useQueryState(amountText, {
    defaultValue: "",
  });
  const [FilterAmountType, setFilterAmountType] = useQueryState("operators", {
    defaultValue: "",
  });

  const handleFilterChange = (filterType: string) => {
    setFilterAmountType(filterType);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterAmount(value);
  };

  const handleReset = () => {
    setFilterAmount("");
    setFilterAmountType("");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onReset(() => handleReset());
  }, [onReset]);

  return (
    <div className="flex items-center space-x-2">
      <Select
        onValueChange={(value) => handleFilterChange(value)}
        defaultValue={FilterAmountType}
        value={FilterAmountType}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("placeholderselect")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">&gt;=</SelectItem>
          <SelectItem value="1">&lt;=</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        value={filterAmount}
        onChange={handleAmountChange}
        placeholder={t("placeholderinput")}
        className="px-2 py-1 border rounded-md border-gray-300 outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
}
