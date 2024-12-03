import { passwordSchema, usernameSchema } from "@/lib/validata";
import { z } from "zod";
import { zfd } from "zod-form-data";

// 创建模式的表单schema
export const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    newPassword: zfd.text(passwordSchema),
    confirmPassword: zfd.text(passwordSchema),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 验证函数
export async function validateFormData(formData: FormData) {
  try {
    const result = await createFormSchema.parse(formData);
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
