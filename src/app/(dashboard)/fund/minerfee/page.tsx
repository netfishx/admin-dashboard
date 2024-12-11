import { Table } from "@/components/ui/table";
import { connection } from "next/server";
import { Suspense } from "react";
import { AddBtn } from "./add-btn";
import { List, TableBodySkeleton, TableHeaderWrapper } from "./list";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  await connection();
  const { loading } = await searchParams;
  if (loading === "true") {
    return (
      <div className="flex flex-col gap-2 w-full h-full">
        <AddBtn />
        <div className="p-2 bg-background flex-1 flex flex-col gap-2">
          <Table className="border rounded-sm ">
            <TableHeaderWrapper />
            <TableBodySkeleton />
          </Table>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full ">
      <AddBtn />
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <Table className="border rounded-sm ">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <List />
        </Suspense>
      </div>
    </div>
  );
}
