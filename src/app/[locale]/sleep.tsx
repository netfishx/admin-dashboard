import { request } from "@/api";
import { ErrorToast } from "@/app/[locale]/errorToast";

export async function Sleep() {
    let data: { time: string } | null = null;
    let error = false;
    try {
        const res = await request(`${process.env.BASE_URL}/`, {
            next: { revalidate: 10 },
        });
        data = (await res.json()) as { time: string };
    } catch (e) {
        console.error(e);
        error = true;
    }
    return (
        <div>
            {(data as { time: string })?.time || "timeout"}
            <ErrorToast error={error} key={Date.now()} />
        </div>
    );
}
