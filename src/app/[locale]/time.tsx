import { request } from "@/api";

export async function Time() {
    let data: { time: string } | null = null;

    try {
        const res = await request(`${process.env.BASE_URL}/time`, {
            next: { revalidate: 10 },
        });
        data = (await res.json()) as { time: string };
    } catch (e) {
        console.error(e);
    }
    return <div>{(data as { time: string })?.time || "timeout"}</div>;
}
