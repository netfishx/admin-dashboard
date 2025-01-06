"use client";
import { Button } from "@/components/ui/button";
import type { AnnouncementList } from "@/lib/types";
import {
  contentEditModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function EditBtn({ data }: { data: AnnouncementList }) {
  const t = useTranslations("system.announcement");

  const setContentModalData = useSetAtom(contentModalDataAtom);
  const setContentEditModal = useSetAtom(contentEditModalAtom);
  const setEditModalTitle = useSetAtom(editModalTitleAtom);
  return (
    <Button
      variant="link"
      className="hover:text-primary/80 hover:no-underline"
      onClick={() => {
        setContentEditModal(true);
        setContentModalData(data);
        setEditModalTitle(t("editModal"));
      }}
    >
      {t("edit")}
    </Button>
  );
}
