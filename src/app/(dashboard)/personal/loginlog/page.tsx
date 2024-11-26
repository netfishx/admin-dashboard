import { Suspense } from "react";
import { Form } from "./form";
import { TableWrapper } from "./table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { pageNum = "1", pageSize = "10", start, end, ip } = await searchParams;
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background p-4">
        <Form />
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense fallback={null}>
            <TableWrapper
              pageNum={pageNum}
              pageSize={pageSize}
              start={start as unknown as Date}
              end={end as unknown as Date}
              ip={ip}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
