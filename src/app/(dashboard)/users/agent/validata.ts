import { z } from "zod";
import { zfd } from "zod-form-data";

// 用户名验证规则
const usernameSchema = z
  .string()
  .min(6, "用户名长度必须在6-16位之间")
  .max(16, "用户名长度必须在6-16位之间")
  .regex(/^[a-z]/, "用户名必须以小写字母开头")
  .regex(/^[a-z0-9]+$/, "用户名只能包含小写字母和数字")
  .refine(
    (value) => !value.toLowerCase().includes("admin"),
    "用户名不能包含'admin'字样",
  );

// 密码验证规则
const passwordSchema = z
  .string()
  .min(8, "密码长度必须在8-16位之间")
  .max(16, "密码长度必须在8-16位之间")
  .regex(/[A-Z]/, "密码必须包含大写字母")
  .regex(/[a-z]/, "密码必须包含小写字母")
  .regex(/[0-9]/, "密码必须包含数字");
// 创建模式的表单schema
export const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    password: zfd.text(passwordSchema),
    confirmPassword: zfd.text(passwordSchema),
    roleList: zfd.repeatableOfType(z.coerce.number()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 验证函数
export async function validateFormData(data: {
  username: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const result = await createFormSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors,
      };
    }
    return {
      success: false,
      errors: [{ path: "form", message: "验证失败" }],
    };
  }
}
