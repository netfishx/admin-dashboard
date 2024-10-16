"use client";

import { request } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";

function useWaitQuery(props: { wait: number }) {
  const query = useSuspenseQuery({
    queryKey: ["wait", props.wait],
    queryFn: async () => {
      const path = `/wait?wait=${props.wait}`;

      const res = await (await request(path)).text();
      return res;
    },
    refetchInterval: 1000,
  });

  return [query.data as string, query] as const;
}

export function Polling(props: { wait: number }) {
  const [data] = useWaitQuery(props);

  return <div>result: {data}</div>;
}
