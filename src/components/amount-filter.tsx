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
import { useState } from "react";

interface AmountFilterProps {
  onFilterChange?: (filterType: string, amount: number | null) => void;
}

const AmountFilter: React.FC<AmountFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(">=");
  const [amount, setAmount] = useState<number | "">("");
  const t = useTranslations("report.orderlist");

  const handleFilterChange = (filterType: string) => {
    setSelectedFilter(filterType);
    onFilterChange?.(filterType, amount ? Number(amount) : null);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedAmount = value === "" ? "" : Number(value);
    setAmount(parsedAmount);
    onFilterChange?.(selectedFilter, parsedAmount === "" ? null : parsedAmount);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        onValueChange={(value) => handleFilterChange(value)}
        defaultValue={selectedFilter}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder={selectedFilter} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=">=">&gt;=</SelectItem>
          <SelectItem value="<=">&lt;=</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        value={amount === "" ? "" : amount}
        onChange={handleAmountChange}
        placeholder={t("placeholderinput")}
        className="w-32 px-2 py-1 border rounded-md border-gray-300 outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default AmountFilter;
