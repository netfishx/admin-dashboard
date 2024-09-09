import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormExample } from "./form";
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex p-4 gap-4">
        <Input />
        <Button>Hello</Button>
      </div>
      <div>
        <FormExample />
      </div>
    </div>
  );
}
