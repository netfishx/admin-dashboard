"use client";
import { Button } from "@/components/ui/button";
import type { AnnouncementList } from "@/lib/types";
import {
  contentEditModalAtom,
  contentModalAtom,
  contentModalDataAtom,
  editModalTitleAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function Actions({
  data,
  showEdit = false,
}: { data: AnnouncementList; showEdit?: boolean }) {
  const t = useTranslations("system.announcement");
  // const [contentModalVisible, setContentModal] = useState(false);

  const setContentModal = useSetAtom(contentModalAtom);
  const setContentModalData = useSetAtom(contentModalDataAtom);
  const setContentEditModal = useSetAtom(contentEditModalAtom);
  const setEditModalTitle = useSetAtom(editModalTitleAtom);
  return (
    <>
      {!showEdit && (
        <Button
          variant="link"
          className="hover:no-underline hover:text-primary/80"
          onClick={() => {
            setContentModal(true);
            setContentModalData(data);
          }}
        >
          {t("more")}
        </Button>
      )}
      {showEdit && (
        <Button
          variant="link"
          className="hover:no-underline hover:text-primary/80"
          onClick={() => {
            setContentEditModal(true);
            setContentModalData(data);
            setEditModalTitle(t("editModal"));
          }}
        >
          {t("edit")}
        </Button>
      )}
    </>
  );
}
