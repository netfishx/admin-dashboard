"use client";

import { incrementNumberAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/locales/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useStateAction } from "next-safe-action/stateful-hooks";
import { type ChangeEvent, type FormEvent, useState } from "react";

export function FormExample() {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const { execute, isPending, hasSucceeded, result } = useStateAction(
    incrementNumberAction,
    {
      initResult: { data: { name: "" } },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    execute(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const t = useI18n();

  return (
    <form onSubmit={handleSubmit}>
      <div>client i18n: {t("hello")}</div>
      <p className="text-blue-500">{JSON.stringify(result)}</p>
      <label htmlFor="name" className="flex flex-col gap-2">
        姓名:
        <Input
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <span className="text-sm text-red-500">
          {result?.validationErrors?.name?._errors?.[0]}
        </span>
      </label>
      <label htmlFor="number" className="flex flex-col gap-2">
        数字:
        <Input
          type="number"
          name="number"
          required
          value={formData.number}
          onChange={handleInputChange}
        />
        <span className="text-sm text-red-500">
          {result?.validationErrors?.number?._errors?.[0]}
        </span>
      </label>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        提交
      </Button>
      {hasSucceeded && <div>成功: {JSON.stringify(result)}</div>}
    </form>
  );
}
