import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function AccountPage() {
  const session = await getServerSession(authConfig);

  return <div>Account Page</div>;
}
