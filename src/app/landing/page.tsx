import { DateRangeFilter } from "@/components/daterange-filter";
import Temp from "./temp";
import { Time } from "./time";

export default async function LandingPage() {
  return (
    <div className="prose">
      <h1>LandingPage</h1>
      <Time />
      <DateRangeFilter />
      <Temp />
    </div>
  );
}
