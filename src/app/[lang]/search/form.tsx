"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

export function SearchForm() {
  const [name, setName] = useQueryState("name", {
    defaultValue: "",
  });
  const [age, setAge] = useQueryState("age", parseAsInteger);
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value ?? "")}
      />
      <Label>Age</Label>
      <Input
        type="number"
        name="age"
        value={age ?? undefined}
        onChange={(e) =>
          setAge(e.target.value ? Number.parseInt(e.target.value) : null)
        }
      />
      <Button onClick={router.refresh}>Search</Button>
    </div>
  );
}
