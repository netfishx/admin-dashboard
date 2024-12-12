import { passwordSchema, usernameSchema } from "@/lib/validata";
import { z } from "zod";
import { zfd } from "zod-form-data";

// 创建模式的表单schema
export const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    nickname: zfd.text(z.string().optional()),
    newPassword: zfd.text(passwordSchema),
    confirmPassword: zfd.text(passwordSchema),
    remark: zfd.text(z.string().optional()),
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

// 编辑模式的表单schema
const editFormSchema = zfd
  .formData({
    id: zfd.text(),
    newPassword: zfd.text(
      z
        .union([
          passwordSchema,
          z
            .string()
            .length(0), // 允许空字符串
        ])
        .optional(),
    ),
    confirmPassword: zfd.text(
      z
        .union([
          passwordSchema,
          z
            .string()
            .length(0), // 允许空字符串
        ])
        .optional(),
    ),
    status: zfd.numeric(z.coerce.number()),
    nickname: zfd.text(),
    remark: zfd.text(),
  })
  .refine(
    (data) => {
      // 如果两个密码字段都为空，通过验证
      if (!(data.newPassword || data.confirmPassword)) {
        return true;
      }
      // 如果填写了密码，则需要验证一致性
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "两次输入的密码不一致",
      path: ["confirmPassword"],
    },
  );

// 验证函数
export async function validateEditFormData(formData: FormData) {
  try {
    const { id, nickname, remark, status, ...rest } =
      await editFormSchema.parse(formData);
    return { success: true, data: { id, nickname, remark, status, ...rest } };
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
