import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function OrdersPage() {
  const session = await getServerSession(authConfig);

  return <div>Orders Page</div>;
}
