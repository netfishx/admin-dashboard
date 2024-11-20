"use client";
import { Button } from "@/components/ui/button";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
export function AddBtn() {
  const t = useTranslations("system.announcement");
  const [, setOpen] = useAtom(contentEditModalAtom);
  const setEditModalTitle = useSetAtom(editModalTitleAtom);
  const setContentModalData = useSetAtom(contentModalDataAtom);
  return (
    <>
      <div className="flex justify-end bg-background">
        <Button
          className="self-end"
          onClick={() => {
            setOpen(true);
            setEditModalTitle(t("addModal"));
            setContentModalData(null);
          }}
        >
          {t("add")}
        </Button>
      </div>
    </>
  );
}
