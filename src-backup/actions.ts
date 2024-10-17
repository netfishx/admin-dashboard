"use server";

import { actionClient } from "@/lib/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /\d/;
const validCharsRegex = /^[a-zA-Z\d]+$/;

export const incrementNumberAction = actionClient
  .schema(
    zfd.formData({
      number: zfd.numeric(
        z.coerce.number().min(100000, { message: "必须至少6位" }),
      ),
      name: zfd.text(
        z.string().refine(
          (password) => {
            const lengthValid = password.length >= 8 && password.length <= 16;
            const hasLowercase = lowercaseRegex.test(password);
            const hasUppercase = uppercaseRegex.test(password);
            const hasDigit = digitRegex.test(password);
            const onlyValidChars = validCharsRegex.test(password);

            return (
              lengthValid &&
              hasLowercase &&
              hasUppercase &&
              hasDigit &&
              onlyValidChars
            );
          },
          {
            message:
              "密码必须是8-16位，包含至少一个小写字母、一个大写字母和一个数字",
          },
        ),
      ),
    }),
  )
  .stateAction(async ({ parsedInput }, { prevResult }) => {
    await new Promise((res) => setTimeout(res, 1000));

    return {
      newName: parsedInput.name,
      number: parsedInput.number + 1,
      prevResult: prevResult,
    };
  });

export async function refresh() {
  revalidateTag("time");
}
