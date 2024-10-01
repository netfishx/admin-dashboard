import { request } from "@/api";
import { headers } from "next/headers";

export async function Time() {
  let data: { time: string } | null = null;

  try {
    const header = await headers();
    const res = await request(`${process.env.BASE_URL}/time`, header, {
      next: { revalidate: 10, tags: ["time"] },
    });
    data = (await res.json()) as { time: string };
  } catch (e) {
    console.error(e);
  }
  return <div>{(data as { time: string })?.time || "timeout"}</div>;
}
