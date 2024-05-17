import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function HomePagePage() {
  const session = await getServerSession(authConfig);

  return <div>Home-Page Page</div>;
}
