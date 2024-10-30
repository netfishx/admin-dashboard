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

const AmountFilter = () => {
  const t = useTranslations("report.orderlist");

  const [filterAmount, setFilterAmount] = useQueryState("filterAmount", {
    defaultValue: "",
  });
  const [FilterAmountType, setFilterAmountType] = useQueryState(
    "filterAmountType",
    {
      defaultValue: "",
    },
  );

  const handleFilterChange = (filterType: string) => {
    setFilterAmountType(filterType);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterAmount(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        onValueChange={(value) => handleFilterChange(value)}
        defaultValue={FilterAmountType}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("placeholderselect")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=">=">&gt;=</SelectItem>
          <SelectItem value="<=">&lt;=</SelectItem>
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
};

export default AmountFilter;
