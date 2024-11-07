import { getMaintainList } from "@/api";
import { MaintainTable } from "@/app/(dashboard)/games/maintain/table";

export async function MaintainTableWrapper() {
  const res = await getMaintainList();
  return <MaintainTable data={res.data ?? []} />;
}
