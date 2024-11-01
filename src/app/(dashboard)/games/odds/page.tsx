import { OddsForm } from "./form";

const data = [
  {
    type: "闲",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "庄",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "和",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "庄对",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
  {
    type: "闲对",
    odds: "11.100",
    min: 1,
    max: 1,
    period: 1,
  },
];

export default function Page() {
  return <OddsForm data={data} />;
}
