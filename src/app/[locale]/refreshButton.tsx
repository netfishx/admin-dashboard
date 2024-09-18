"use client";

import { refresh } from "@/actions";
import { Button } from "@/components/ui/button";

export function RefreshButton() {
  return (
    <Button
      onClick={async () => {
        await refresh();
      }}
    >
      Refresh
    </Button>
  );
}
