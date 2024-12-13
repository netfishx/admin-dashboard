import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Big from "big.js";

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
  return (
    <div className="flex gap-[1px]">
      <Button
        variant="ghost"
        className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
        onClick={() => {
          handleEdit(-step);
        }}
      >
        -
      </Button>
      <Input
        className="rounded-none w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        defaultValue={1}
        onChange={(e) => {
          try {
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
        className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
        onClick={() => {
          handleEdit(step);
        }}
      >
        +
      </Button>
    </div>
  );
}
