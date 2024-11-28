"use server";
import { editRole, editSupplierConfig, login, logout } from "@/api";
// import { z } from "zod";
// import { zfd } from "zod-form-data";
import { setSession, signOut } from "@/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// const lowercaseRegex = /[a-z]/;
// const uppercaseRegex = /[A-Z]/;
// const digitRegex = /\d/;
// const validCharsRegex = /^[a-zA-Z\d]+$/;

// export const incrementNumberAction = actionClient
//   .schema(
//     zfd.formData({
//       number: zfd.numeric(
//         z.coerce.number().min(100000, { message: "必须至少6位" }),
//       ),
//       name: zfd.text(
//         z.string().refine(
//           (password) => {
//             const lengthValid = password.length >= 8 && password.length <= 16;
//             const hasLowercase = lowercaseRegex.test(password);
//             const hasUppercase = uppercaseRegex.test(password);
//             const hasDigit = digitRegex.test(password);
//             const onlyValidChars = validCharsRegex.test(password);

//             return (
//               lengthValid &&
//               hasLowercase &&
//               hasUppercase &&
//               hasDigit &&
//               onlyValidChars
//             );
//           },
//           {
//             message:
//               "密码必须是8-16位，包含至少一个小写字母、一个大写字母和一个数字",
//           },
//         ),
//       ),
//     }),
//   )
//   .stateAction(async ({ parsedInput }, { prevResult }) => {
//     await new Promise((res) => setTimeout(res, 1000));

//     return {
//       newName: parsedInput.name,
//       number: parsedInput.number + 1,
//       prevResult: prevResult,
//     };
//   });

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const code = formData.get("code");
  const captcha = formData.get("captcha");

  if (!(username && password)) {
    return { message: "请输入用户名和密码" };
  }
  if (!(code && captcha)) {
    return { message: "请输入验证码" };
  }

  const res = await login({
    username: username.toString(),
    password: password.toString(),
    code: code.toString(),
    captcha: captcha.toString(),
  });

  if (res.code === 0 && res.data) {
    await setSession(res.data);
    const cookie = await cookies();
    cookie.set("isFirstLogin", "true");
    return redirect("/");
  }
  return { message: res.message };
}

export async function signOutAction() {
  await Promise.all([logout(), signOut()]);
}

export async function editSupplierConfigAction(formData: FormData) {
  const game = formData.get("game")?.toString();
  const [gameType, gameId] = game?.split("-") ?? [];
  const res = await editSupplierConfig({
    id: formData.get("id") ? formData.get("id")?.toString() : undefined,
    gameType: Number(gameType ?? 0),
    gameId: Number(gameId ?? 0),
    videoLink: formData.get("videoLink")?.toString() ?? "",
    userId: formData.get("userId")?.toString() ?? "",
    distributionAmount: Number(formData.get("distributionAmount")),
    distributionPercent: Number(formData.get("distributionPercent")),
  });
  return res;
}

export async function editRoleAction(formData: FormData) {
  return await editRole({
    id: formData.get("id") ? Number(formData.get("id")) : undefined,
    roleName: formData.get("roleName")?.toString() ?? "",
    permsIds: (formData.get("permsIds")?.toString() ?? "")
      .split(",")
      .map((item) => Number(item)),
  });
}
