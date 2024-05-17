import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      Hello Dashboard Page (You are signed in)!
      <h1>{session?.user.email}</h1>
      <h1>{session?.user.image}</h1>
    </div>
  );
}
