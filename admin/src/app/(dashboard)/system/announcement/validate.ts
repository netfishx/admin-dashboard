import { z } from "zod";
import { zfd } from "zod-form-data";

type ValidateMode = "agent" | "member";

// 必填验证规则
export const requiredSchema = z.string({
  required_error: "请填写必填项",
});

// 会员的表单schema
export const memberFormSchema = zfd.formData({
  type: zfd.text(requiredSchema),
  startTime: zfd.text(requiredSchema),
  endTime: zfd.text(requiredSchema),
  language: zfd.text(requiredSchema),
  labelOfLanguage: zfd.text(requiredSchema),
  contentOfLanguage: zfd.text(requiredSchema),
  status: zfd.text(requiredSchema),
});

// 代理的表单schema
const agentFormSchema = zfd.formData({
  type: zfd.text(requiredSchema),
  startTime: zfd.text(requiredSchema),
  endTime: zfd.text(requiredSchema),
  language: zfd.text(requiredSchema),
  label: zfd.text(requiredSchema),
  content: zfd.text(requiredSchema),
  status: zfd.text(requiredSchema),
});

// 验证函数
export async function validateFormData(
  formData: FormData,
  mode: ValidateMode = "agent",
) {
  try {
    const schema = mode === "agent" ? agentFormSchema : memberFormSchema;
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
