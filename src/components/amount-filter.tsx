"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

interface AmountFilterProps {
  onFilterChange?: (filterType: string, amount: number | null) => void;
}

const AmountFilter: React.FC<AmountFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<">=" | "<=">(">=");
  const [amount, setAmount] = useState<number | "">("");
  const t = useTranslations("report.orderlist");

  const handleFilterClick = (filterType: ">=" | "<=") => {
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
      <Button
        className={`px-4 py-2 border rounded-md ${
          selectedFilter === ">="
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => handleFilterClick(">=")}
      >
        &gt;=
      </Button>
      <Button
        className={`px-4 py-2 border rounded-md ${
          selectedFilter === "<="
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => handleFilterClick("<=")}
      >
        &lt;=
      </Button>
      <Input
        type="number"
        value={amount === "" ? "" : amount}
        onChange={handleAmountChange}
        placeholder={t("placeholderinput")}
        className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default AmountFilter;
