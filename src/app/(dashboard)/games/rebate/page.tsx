import { RebateForm } from "./form";

const data = [
  {
    game: "百家乐01",
    value: 1,
  },
  {
    game: "百家乐02",
    value: 1,
  },
  {
    game: "百家乐03",
    value: 1,
  },
  {
    game: "百家乐04",
    value: 1,
  },
  {
    game: "百家乐05",
    value: 1,
  },
];

export default function Page() {
  return <RebateForm data={data} />;
}
