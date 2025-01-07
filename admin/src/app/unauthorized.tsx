import { Link } from "next-view-transitions";

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href="/login">Login</Link>
    </main>
  );
}
