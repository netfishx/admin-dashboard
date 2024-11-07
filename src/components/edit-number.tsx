import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditNumber({
  step,
  setStep,
  handleEdit,
}: {
  step: number;
  setStep: (value: number) => void;
  handleEdit: (num: number) => void;
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
        className="rounded-none w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={step}
        onChange={(e) => {
          setStep(Number(e.target.value));
        }}
        type="number"
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
