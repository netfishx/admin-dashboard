import { passwordSchema, usernameSchema } from "@/lib/validata";
import { z } from "zod";
import { zfd } from "zod-form-data";
// 定义验证模式类型
type ValidateMode = "create" | "edit";

// 创建模式的表单schema
const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    newPassword: zfd.text(passwordSchema),
    confirmPassword: zfd.text(z.string().nullish()),
    roleList: zfd.repeatableOfType(z.string()),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

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
    roleList: zfd.repeatableOfType(z.string()),
    status: zfd.numeric(z.coerce.number()),
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
