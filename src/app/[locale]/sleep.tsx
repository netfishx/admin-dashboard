import { request } from "@/api";
import { ErrorToast } from "@/app/[locale]/errorToast";
import { headers } from "next/headers";

export async function Sleep() {
  let data: { time: string } | null = null;
  let error = false;
  try {
    const header = await headers();
    const res = await request("/", header);
    data = (await res.json()) as { time: string };
  } catch (e) {
    console.error(e);
    error = true;
  }
  return (
    <div>
      {(data as { time: string })?.time || "timeout"}|{error && "error"}
      <ErrorToast error={error} key={Date.now()} />
    </div>
  );
}
