import { Component as LineChart } from "./chart";

export default function LinePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Line Chart</h1>
      <LineChart />
    </div>
  );
}
