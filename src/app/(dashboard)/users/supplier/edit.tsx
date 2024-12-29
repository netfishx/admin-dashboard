"use client";

import { Button } from "@/components/ui/button";
import type { Supplier } from "@/lib/types";
import { supplierEditDataAtom, supplierEditModalAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function EditButton({ data }: { data: Supplier }) {
  const t = useTranslations("users.supplier");
  const setSupplierEditModal = useSetAtom(supplierEditModalAtom);
  const setSupplierEditData = useSetAtom(supplierEditDataAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary/80 text-sm"
      onClick={() => {
        setSupplierEditData(data);
        setSupplierEditModal(true);
      }}
    >
      {t("edit")}
    </Button>
  );
}
