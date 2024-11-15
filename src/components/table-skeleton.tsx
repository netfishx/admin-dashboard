import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";
import { TableBody } from "./ui/table";

export default function TableSkeleton(props: { length?: number }) {
  const { length = 5 } = props;
  return (
    <TableBody>
      {Array.from({ length }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={i}>
          <TableCell colSpan={2}>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
