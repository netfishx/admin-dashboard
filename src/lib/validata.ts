import { z } from "zod";

// 用户名验证规则
export const usernameSchema = z
  .string({
    required_error: "用户名不能为空",
  })
  .min(6, "用户名长度必须在6-16位之间")
  .max(16, "用户名长度必须在6-16位之间")
  .regex(/^[a-z]/, "用户名必须以小写字母开头")
  .regex(/^[a-z0-9]+$/, "用户名只能包含小写字母和数字")
  .refine(
    (value) => !value.toLowerCase().includes("admin"),
    "用户名不能包含'admin'字样",
  );

// 密码验证规则
export const passwordSchema = z
  .string({
    required_error: "密码不能为空",
  })
  .min(8, "密码长度必须在8-16位之间")
  .max(16, "密码长度必须在8-16位之间")
  .regex(/[A-Z]/, "密码必须包含大写字母")
  .regex(/[a-z]/, "密码必须包含小写字母")
  .regex(/[0-9]/, "密码必须包含数字");
