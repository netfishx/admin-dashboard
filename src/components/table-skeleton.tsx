import { Skeleton } from "./ui/skeleton";
import { TableBody, TableCell, TableRow } from "./ui/table";

export default function TableSkeleton(props: {
  length?: number;
  colSpan?: number;
}) {
  const { length = 5, colSpan = 5 } = props;
  return (
    <TableBody>
      {Array.from({ length }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={i}>
          <TableCell colSpan={colSpan}>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
