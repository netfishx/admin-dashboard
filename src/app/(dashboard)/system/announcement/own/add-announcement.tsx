"use client";
import { Button } from "@/components/ui/button";
import { contentEditModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
export function AddAnnouncement() {
  const t = useTranslations("system.announcement");
  const [, setOpen] = useAtom(contentEditModalAtom);
  return (
    <>
      <Button className="float-right mb-2" onClick={() => setOpen(true)}>
        {t("add")}
      </Button>
      {/* <AddModal title={t("addModal")} /> */}
    </>
  );
}
