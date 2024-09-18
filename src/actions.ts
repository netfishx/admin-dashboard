"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { createServerAction } from "zsa";

export const incrementNumberAction = createServerAction()
  .input(
    z.object({
      number: z.coerce.number(),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return input.number + 1;
  });

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function refresh() {
  revalidatePath("/");
}
