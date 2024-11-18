import { Skeleton } from "./ui/skeleton";

export default function TableSkeleton(props: { length?: number }) {
  const { length = 5 } = props;
  return (
    <div className="flex flex-col gap-4 p-4">
      {Array.from({ length }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton key={i} className="w-full h-6" />
      ))}
    </div>
  );
}
