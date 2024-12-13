"use client";
import { Button } from "@/components/ui/button";
import type { AnnouncementList } from "@/lib/types";
import { contentModalAtom, contentModalDataAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function ViewBtn({ data }: { data: AnnouncementList }) {
  const t = useTranslations("system.announcement");

  const setContentModal = useSetAtom(contentModalAtom);
  const setContentModalData = useSetAtom(contentModalDataAtom);
  return (
    <>
      <Button
        variant="link"
        className="hover:text-primary/80 hover:no-underline"
        onClick={() => {
          setContentModal(true);
          setContentModalData(data);
        }}
      >
        {t("more")}
      </Button>
    </>
  );
}
