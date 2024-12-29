"use client";
import { Button } from "@/components/ui/button";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
export function AddBtn() {
  const t = useTranslations("system.announcement");
  const setOpen = useSetAtom(contentEditModalAtom);
  const setEditModalTitle = useSetAtom(editModalTitleAtom);
  const setContentModalData = useSetAtom(contentModalDataAtom);
  return (
    <>
      <div className="bg-background flex justify-end px-2 pt-2">
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
