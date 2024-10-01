import { request } from "@/api";
import { ErrorToast } from "@/app/[locale]/errorToast";
import { headers } from "next/headers";

export async function Sleep() {
  let data: { time: string } | null = null;
  let error = false;
  let time = 0;
  try {
    const header = await headers();
    const res = await request("/", header, {
      next: { revalidate: 10 },
    });
    data = (await res.json()) as { time: string };
  } catch (e) {
    console.error(e);
    error = true;
    time = Date.now();
  }
  return (
    <div>
      {(data as { time: string })?.time || "timeout"}|{error && "error"}
      <ErrorToast error={error} time={time} />
    </div>
  );
}
