import { z } from "zod";
import { zfd } from "zod-form-data";

// 定义验证模式类型
type ValidateMode = "create" | "edit";

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
const createFormSchema = zfd
  .formData({
    username: zfd.text(usernameSchema),
    newPassword: zfd.text(passwordSchema),
    confirmPassword: zfd.text(passwordSchema),
    roleList: zfd.repeatableOfType(z.coerce.number()),
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
    roleList: zfd.repeatableOfType(z.coerce.number()),
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
