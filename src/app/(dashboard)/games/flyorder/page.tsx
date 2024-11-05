import { FlyOrderForm } from "@/app/(dashboard)/games/flyorder/form";
const data = [
  {
    game: "百家乐01",
    isOpen: true,
  },
  {
    game: "百家乐02",
    isOpen: true,
  },
  {
    game: "百家乐03",
    isOpen: false,
  },
  {
    game: "百家乐04",
    isOpen: true,
  },
  {
    game: "百家乐05",
    isOpen: false,
  },
];

export default function Page() {
  return <FlyOrderForm data={data} />;
}
