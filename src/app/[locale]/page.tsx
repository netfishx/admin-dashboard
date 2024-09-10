import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headers } from "next/headers";
import { FormExample } from "./form";

export default function Home() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  console.info(headers().get('x-forwarded-for'))
  const array = headers().get('x-forwarded-for')?.split(',')[0]?.split(':')
  const ip = array?.[array.length - 1] ?? FALLBACK_IP_ADDRESS
  return (
    <div className="flex flex-col gap-4">
      {ip}
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
