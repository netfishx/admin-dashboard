"use server";

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
