import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import styles from "./progress.module.css";

export function SecurityProgress({ value }: { value?: number }) {
  const t = useTranslations("personal.security");

  return (
    <div className="bg-background p-4 flex flex-col gap-2">
      <span className="text-sm font-medium">{t("progress")}</span>
      <div className="flex items-center gap-2">
        {value ? (
          <>
            <progress value={value} max={100} className={styles.progress} />
            <span className="text-sm text-muted-foreground">{value}%</span>
          </>
        ) : (
          <Skeleton className="w-1/2" />
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        {value ? (
          value >= 99 ? (
            t("progressWarning3")
          ) : value >= 66 ? (
            t("progressWarning2")
          ) : (
            t("progressWarning")
          )
        ) : (
          <Skeleton className="w-1/3" />
        )}
      </span>
    </div>
  );
}
