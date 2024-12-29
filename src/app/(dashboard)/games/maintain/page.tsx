import { MaintainForm } from "@/app/(dashboard)/games/maintain/form";
import { MaintainTableWrapper } from "@/app/(dashboard)/games/maintain/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Suspense } from "react";
import { MaintainTableHeader } from "./table";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-2">
      <MaintainForm />
      <div className="bg-background flex-1 p-4">
        <div className="rounded-sm border">
          <Suspense
            fallback={
              <Table className="table-fixed">
                <MaintainTableHeader allChecked={false} />
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            }
          >
            <MaintainTableWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
