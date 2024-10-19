import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditNumber() {
  return (
    <div className="flex gap-[1px]">
      <Button
        variant="ghost"
        className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
      >
        -
      </Button>
      <Input
        className="rounded-none w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        defaultValue={1}
        type="number"
      />
      <Button
        variant="ghost"
        className="rounded-none bg-accent text-accent-foreground hover:bg-accent/50"
      >
        +
      </Button>
    </div>
  );
}
