"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
export function SearchForm() {
  const [query, setQuery] = useQueryState("q");
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        name="q"
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value ?? "")}
      />
      <Button onClick={router.refresh}>Search</Button>
    </div>
  );
}
