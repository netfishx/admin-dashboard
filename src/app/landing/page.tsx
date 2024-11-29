import { temp } from "./temp";

export default async function LandingPage() {
  await temp();

  return (
    <div className="prose">
      <h1>LandingPage</h1>
    </div>
  );
}
