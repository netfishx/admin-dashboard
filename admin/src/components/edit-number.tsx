"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Big from "big.js";
import { useState } from "react";

export function EditNumber({
  step,
  setStep,
  handleEdit,
  limit = 1,
}: {
  step: number;
  setStep: (value: number) => void;
  handleEdit: (num: number) => void;
  limit?: number;
}) {
  const [isValid, setIsValid] = useState(true);
  return (
    <div className="flex gap-[1px]">
      <Button
        variant="ghost"
        className="bg-accent text-accent-foreground hover:bg-accent/50 rounded-none"
        onClick={() => {
          handleEdit(-step);
        }}
        disabled={!isValid}
      >
        -
      </Button>
      <Input
        className="w-14 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        defaultValue={1}
        onChange={(e) => {
          try {
            setIsValid(e.target.validity.valid);
            setStep(e.target.value ? Big(e.target.value).toNumber() : 0);
          } catch (e) {
            console.error(e);
          }
        }}
        required
        step={limit}
        type="number"
        onBlur={(e) => {
          e.target.reportValidity();
        }}
      />
      <Button
        variant="ghost"
        className="bg-accent text-accent-foreground hover:bg-accent/50 rounded-none"
        onClick={() => {
          handleEdit(step);
        }}
        disabled={!isValid}
      >
        +
      </Button>
    </div>
  );
}
