import { moneyPasswordSchema, passwordSchema } from "@/lib/validata";
import { z } from "zod";
import { zfd } from "zod-form-data";

type ValidateMode = "create" | "edit";

// 资金
// 创建模式的表单schema
const createFormSchema = zfd
  .formData({
    newPassword: zfd.text(moneyPasswordSchema),
    confirmPassword: zfd.text(moneyPasswordSchema),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 编辑模式的表单schema
const editFormSchema = zfd
  .formData({
    oldPassword: zfd.text(moneyPasswordSchema),
    newPassword: zfd.text(moneyPasswordSchema),
    confirmPassword: zfd.text(moneyPasswordSchema),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 验证函数
export async function validateFormData(
  formData: FormData,
  mode: ValidateMode = "create",
) {
  try {
    const schema = mode === "create" ? createFormSchema : editFormSchema;
    const result = await schema.parse(formData);
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

// 编辑模式的表单schema
const loginEditFormSchema = zfd
  .formData({
    oldPassword: zfd.text(),
    newPassword: zfd.text(passwordSchema),
    confirmPassword: zfd.text(passwordSchema),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// 验证函数
export async function validateLoginFormData(formData: FormData) {
  try {
    const schema = loginEditFormSchema;
    const result = await schema.parse(formData);
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
