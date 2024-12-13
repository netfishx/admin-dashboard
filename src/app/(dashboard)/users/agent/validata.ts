import { passwordSchema, usernameSchema } from "@/lib/validata";
import { z } from "zod";
import { zfd } from "zod-form-data";

// 创建模式的表单schema
export const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    nickname: zfd.text(z.string().optional()),
    password: zfd.text(passwordSchema),
    confirmPassword: zfd.text(z.string().nullable()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 验证函数
export async function validateFormData(formData: FormData) {
  try {
    const { username, nickname, password } =
      await createFormSchema.parse(formData);
    return { success: true, data: { username, nickname, password } };
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
