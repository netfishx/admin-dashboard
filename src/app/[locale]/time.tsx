export async function Time() {
    const res = await fetch(`${process.env.BASE_URL}/time`, { next: { revalidate: 10 } })
    const data = await res.json()
    return <div>{(data as { time: string }).time}</div>
}