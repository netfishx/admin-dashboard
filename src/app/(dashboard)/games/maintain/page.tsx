import { Suspense } from "react";
import { MaintainForm } from "./form";
import { MaintainTable } from "./table";
const data = [
  {
    game: "百家乐01",
    status: 1,
    id: 1,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐02",
    status: 1,
    id: 2,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐03",
    status: 0,
    id: 3,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐04",
    status: 1,
    id: 4,
    time: "2024-01-01 00:00:00",
  },
  {
    game: "百家乐05",
    status: 1,
    id: 5,
    time: "2024-01-01 00:00:00",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <MaintainForm />
      </Suspense>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <MaintainTable data={data} />
        </div>
      </div>
    </div>
  );
}
