"use client";

import { incrementNumberAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useServerAction } from "zsa-react";

export function FormExample() {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(incrementNumberAction);
  return (
    <form action={executeFormAction}>
      <label htmlFor="number">
        Name:
        <Input type="number" name="number" required />
      </label>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Submit
      </Button>

      {isPending && <div>Loading...</div>}
      {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
      {isError && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
    </form>
  );
}
