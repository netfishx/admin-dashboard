import { Polling } from "./polling";

export default function PollingPage() {
  return (
    <div className="flex flex-col gap-4">
      <Polling wait={1000} />
    </div>
  );
}
