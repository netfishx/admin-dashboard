"use client"

import { incrementNumberAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerAction } from "zsa-react"

export function FormExample() {
    const { isPending, executeFormAction, isSuccess, data, isError, error } =
        useServerAction(incrementNumberAction)
    return (
        <form
            action={executeFormAction}
        >
            <label>
                Name:
                <Input type="number" name="number" required />
            </label>
            <Button type="submit" disabled={isPending}>
                Submit
            </Button>
            {isPending && <div>Loading...</div>}
            {isSuccess && <div>Success: {JSON.stringify(data)}</div>}
            {isError && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
        </form>
    );
}