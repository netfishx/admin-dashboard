import { ErrorToast } from "@/app/[locale]/errorToast"
import { request } from "@/utils/api"

export async function Sleep() {
    let data: { time: string } | null = null
    let error = false
    try {
        const res = await request(`${process.env.BASE_URL}/`, { next: { revalidate: 10 } })
        data = (await res.json()) as { time: string }
    } catch (e) {
        console.error(e)
        error = true
    }
    return (
        <div>
            {(data as { time: string })?.time || "timeout"}
            <ErrorToast error={error} />
        </div>
    )
}