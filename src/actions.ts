"use server";
import { editRole, editSupplierConfig, login, logout } from "@/api";
import { setSession, signOut } from "@/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getVersion() {
  return process.env.NEXT_PUBLIC_TIMESTAMP;
}

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
  if (res.data?.permissions?.length === 0) {
    return { message: "当前账号未分配权限，无法登录" };
  }
  if (res.code === 0 && res.data) {
    await setSession(res.data);
    const cookie = await cookies();
    cookie.set("isFirstLogin", "true");
    return redirect("/");
  }
  return { message: res.message };
}

export async function signOutAction() {
  await logout();
  await signOut();
  return redirect("/login");
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
    id: (formData.get("id") as string) ?? undefined,
    roleName: formData.get("roleName")?.toString() ?? "",
    permsIds: (formData.get("permsIds")?.toString() ?? "")
      .split(",")
      .map((item) => Number(item)),
  });
}
