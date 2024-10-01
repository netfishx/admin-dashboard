"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function SearchForm() {
  const [data, setData] = useQueryStates({
    name: parseAsString.withDefault(""),
    age: parseAsInteger,
  });
  const { name, age } = data;
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <Label>Age</Label>
      <Input
        type="number"
        name="age"
        value={age ?? undefined}
        onChange={(e) =>
          setData({
            ...data,
            age: e.target.value ? Number.parseInt(e.target.value) : null,
          })
        }
      />
      <Button onClick={router.refresh}>Search</Button>
    </div>
  );
}
